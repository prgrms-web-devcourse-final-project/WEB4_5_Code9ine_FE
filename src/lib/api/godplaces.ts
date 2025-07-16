const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

export const getGodplaces = async (location: string, category: string) => {
  if (category !== 'null') {
    const searchType: string[] = category.split(',');

    const typeArr: string[] = [];
    const categoryArr: string[] = [];
    searchType.forEach((d) => {
      if (d === '도서관') {
        typeArr.push('library');
      } else if (d === '축제') {
        typeArr.push('festival');
      } else {
        typeArr.push('store');
        if (d === '미용') {
          categoryArr.push('미용업');
        } else if (d === '세탁') {
          categoryArr.push('세탁업');
        } else if (d === '숙박') {
          categoryArr.push('숙박업');
        } else {
          categoryArr.push(d);
        }
      }
    });

    console.log(typeArr, categoryArr);

    if (typeArr.length > 0) {
      // console.log(`location=${location}&type=${typeArr.join(',')}`);

      if (categoryArr.length > 0) {
        return await (
          await fetch(
            `${url}/api/places/search?location=${location}&type=${typeArr.join(',')}&category=${categoryArr.join(',')}`,
            {
              ...options,
            },
          )
        ).json();
      } else {
        return await (
          await fetch(
            `${url}/api/places/search?location=${location}&type=${typeArr.join(',')}`,
            {
              ...options,
            },
          )
        ).json();
      }
    }
  } else {
    return await (
      await fetch(`${url}/api/places/search?location=${location}`, {
        ...options,
      })
    ).json();
  }
};

export const getGodplaceDetails = async (type: string, id: string) => {
  return await (
    await fetch(`${url}/api/places/detail?type=${type}&id=${id}`)
  ).json();
};

export const getHotLocation = async () => {
  return await (await fetch(`${url}/api/searches/top`)).json();
};
