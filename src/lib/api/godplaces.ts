const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
};

export const getGodplaces = async (location: string, category: string) => {
  if (category === 'null') {
    return await (
      await fetch(`${url}/api/places/search?location=${location}`, {
        ...options,
      })
    ).json();
  }

  const query = new URLSearchParams({ location: decodeURIComponent(location) });
  const searchTypes = category.split(',');

  const typeMap: Record<string, string> = {
    도서관: 'library',
    축제: 'festival',
  };

  const categoryMap: Record<string, string> = {
    미용: '미용업',
    세탁: '세탁업',
    숙박: '숙박업',
  };

  const typeSet = new Set<string>();
  const categorySet = new Set<string>();

  for (const item of searchTypes) {
    const mappedType = typeMap[item];
    if (mappedType) {
      typeSet.add(mappedType);
    } else {
      typeSet.add('store');
      const mappedCategory = categoryMap[item];
      if (mappedCategory) {
        categorySet.add(mappedCategory);
      } else {
        categorySet.add(item);
      }
    }
  }

  if (typeSet.size > 0) {
    query.append('type', Array.from(typeSet).join(','));
  }

  if (categorySet.size > 0) {
    query.append('category', Array.from(categorySet).join(','));
  }

  return await (
    await fetch(`${url}/api/places/search?${query.toString()}`, {
      ...options,
    })
  ).json();
};

export const getGodplaceDetails = async (type: string, id: string) => {
  return await (
    await fetch(`${url}/api/places/detail?type=${type}&id=${id}`, {
      ...options,
    })
  ).json();
};

export const getHotLocation = async () => {
  return await (await fetch(`${url}/api/searches/top`, { ...options })).json();
};

export const patchBookmark = async (
  userId: number,
  type: string,
  id: number,
) => {
  let requestItem;
  if (type === 'store') requestItem = { storeId: id };
  else if (type === 'festival') requestItem = { festivalId: id };
  else if (type === 'library') requestItem = { libraryId: id };

  return await (
    await fetch(`${url}/api/users/${userId}/places-bookmarks/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestItem),
    })
  ).json();
};

export const getBookmarks = async () => {
  return await (
    await fetch(`${url}/api/members/bookmarks/places`, {
      ...options,
    })
  ).json();
};
