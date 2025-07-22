const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ADMIN_KEY}`,
  },
};

export const getTodayStats = async () => {
  return await (
    await fetch(`${url}/api/admin-stats/daily-stats`, {
      ...options,
    })
  ).json();
};

export const getAllUsers = async (page = 1, size = 10) => {
  return await (
    await fetch(`${url}/api/admin-users?page=${page}&size=${size}`, {
      ...options,
    })
  ).json();
};

export const blockUser = async (id: number) => {
  return await (
    await fetch(`${url}/api/admin-users/${id}/block`, {
      ...options,
      method: 'PATCH',
    })
  ).json();
};
