import toast from 'react-hot-toast';

export const API_ADD = process.env.NEXT_PUBLIC_API_BASE_URL;
const Access_Token = process.env.NEXT_PUBLIC_API_KEY;

const getOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Access_Token}`,
  },
};

const postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Access_Token}`,
  },
};

const deleteOptions = {
  method: 'Delete',
  headers: {
    Authorization: `Bearer ${Access_Token}`,
  },
};

const patchOptions = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Access_Token}`,
  },
};

export const setData = async () => {
  return await (
    await fetch(`${API_ADD}/api/budget/totaldetails`, {
      ...getOptions,
    })
  ).json();
};

export const setDayData = async (dateData: Date | null) => {
  return await (
    await fetch(
      `${API_ADD}/api/budget/detail?date=${dateData?.getFullYear()}-${(dateData!.getMonth() + 1).toString().padStart(2, '0')}-${dateData?.getDate().toString().padStart(2, '0')}`,
      { ...getOptions },
    )
  ).json();
};

export const setMonthData = async (today: Date, month: number) => {
  return await fetch(
    `${API_ADD}/api/budget/calendar?yearmonth=${today.getFullYear()}-${month.toString().padStart(2, '0')}`,
    { ...getOptions },
  );
};

export const postAccount = async (
  accountTag: string,
  startDate: Date,
  value: string,
  price: string,
  content: string,
) => {
  try {
    const response = await fetch(`${API_ADD}/api/budget/detail`, {
      ...postOptions,
      body: JSON.stringify({
        type: accountTag,
        date: `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate()}`,
        category: value,
        price: Number(price.replace(',', '')),
        content: content,
        repeatCycle: 'NONE',
      }),
    });

    if (!response.ok) throw new Error('통신에 실패했습니다');

    const result = await response.json();
    console.log(result);
    toast.success('저장되었습니다');
  } catch (error) {
    console.error(error);
    toast.error('문제가 발생했습니다');
  }
};

export const patchAccount = async (
  accountTag: string,
  startDate: Date,
  value: string,
  price: string,
  content: string,
  isId: number,
) => {
  try {
    const response = await fetch(API_ADD + `/api/budget/detail/${isId}`, {
      ...patchOptions,
      body: JSON.stringify({
        type: accountTag,
        date: `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate()}`,
        category: value,
        price: Number(price.replace(',', '')),
        content: content,
        repeatCycle: 'NONE',
      }),
    });

    if (!response.ok) throw new Error('통신에 실패했습니다');

    const result = await response.json();
    console.log(result);
    toast.success('수정되었습니다');
  } catch (error) {
    console.error(error);
    toast.error('문제가 발생했습니다');
  }
};

export const deleteAccount = async (index: number) => {
  try {
    const response = await fetch(API_ADD + `/api/budget/detail/${index}`, {
      ...deleteOptions,
    });

    if (!response.ok) throw new Error('통신에 실패했습니다');

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const noExpense = async () => {
  try {
    const response = await fetch(API_ADD + `/api/budget/noexpenses`, {
      ...postOptions,
    });

    if (!response.ok) throw new Error('통신에 실패했습니다');

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
