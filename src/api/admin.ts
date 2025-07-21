const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

export const getTodayStats = async () => {
  return await (await fetch(`${url}/api/admin-stats/daily-stats`, {
    ...options
  })).json();
}