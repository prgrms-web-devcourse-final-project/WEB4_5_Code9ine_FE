import toast from 'react-hot-toast';

export const API_ADD = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const setData = async () => {
  return await (
    await fetch(`${API_ADD}/api/budget/totaldetails`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    })
  ).json();
};

export const setDayData = async (dateData: Date | null) => {
  return await (
    await fetch(
      `${API_ADD}/api/budget/detail?date=${dateData?.getFullYear()}-${(dateData!.getMonth() + 1).toString().padStart(2, '0')}-${dateData?.getDate().toString().padStart(2, '0')}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          accept: 'application/json',
        },
      },
    )
  ).json();
};

export const setMonthData = async (today: Date, month: number) => {
  return await fetch(
    `${API_ADD}/api/budget/calendar?yearmonth=${today.getFullYear()}-${month.toString().padStart(2, '0')}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    },
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
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
      method: 'Delete',
      credentials: 'include',
      headers: {},
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
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('통신에 실패했습니다');

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
