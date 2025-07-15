const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

export const getGodplaces = async (location: string) => {
  return await (
    await fetch(`${url}/api/places/search?location=${location}`, { ...options })
  ).json();
};

export const getGodplaceDetails = async (type: string, id: string) => {
  return await (
    await fetch(`${url}/api/places/detail?type=${type}&id=${id}`)
  ).json();
};

export const getHotLocation = async () => {
  return await (await fetch(`${url}/api/searches/top`)).json();
};
