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
