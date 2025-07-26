import { NewStore } from '@/types/admin';

const url = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const options = {
  method: 'GET',
  credentials: 'include' as const,
  headers: {
    accept: 'application/json',
  },
};

const postOptions = {
  method: 'POST',
  credentials: 'include' as const,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const patchOptions = {
  method: 'PATCH',
  credentials: 'include' as const,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
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

export const searchUserByNickname = async (nickname: string) => {
  return await (
    await fetch(`${url}/api/admin-users/search?nickname=${nickname}`, {
      ...options,
    })
  ).json();
};

export const getAllStores = async (page = 1, size = 10) => {
  return await (
    await fetch(`${url}/api/admin-stores?page=${page}&size=${size}`, {
      ...options,
    })
  ).json();
};

export const getStroesByCategory = async (
  category: string,
  page = 1,
  size = 10,
) => {
  return await (
    await fetch(
      `${url}/api/admin-stores/search?category=${category}&page=${page}&size=${size}`,
      { ...options },
    )
  ).json();
};

export const postNewStore = async (data: NewStore) => {
  return await (
    await fetch(`${url}/api/admin-stores`, {
      ...postOptions,
      body: JSON.stringify(data),
    })
  ).json();
};

export const modifyStore = async (data: NewStore, id: number) => {
  return await (
    await fetch(`${url}/api/admin-stores/${id}`, {
      ...patchOptions,
      body: JSON.stringify(data),
    })
  ).json();
};

export const deleteStore = async (id: number) => {
  return await (
    await fetch(`${url}/api/admin-stores/${id}/delete`, { ...patchOptions })
  ).json();
};
