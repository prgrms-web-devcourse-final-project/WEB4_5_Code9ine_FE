export const API_ADD = process.env.NEXT_PUBLIC_API_BASE_URL;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjFAZXhhbXBsZS5jb20iLCJqdGkiOiIwNTFkNWM0Mi1iYTQzLTQ5ZjctODE3Yi01M2JlMGU1YjFjYjgiLCJyb2xlcyI6IlJPTEVfVVNFUiIsImV4cCI6MTc1MzI1MzY0M30.hRn2N1Zxtu7X8uEvWuwJSp_6wV3ite5CzRFipiCrnfAKk1h22ALmXdGfoOC-wcZV',
  },
};

export const setData = async () => {
  return await (
    await fetch(`${API_ADD}/api/budget/totaldetails`, {
      cache: 'force-cache',
      ...options,
    })
  ).json();
};

export const setDayData = async (dateData: Date | null) => {
  return await (
    await fetch(
      `${API_ADD}/api/budget/detail?date=${dateData?.getFullYear()}-${(dateData!.getMonth() + 1).toString().padStart(2, '0')}-${dateData?.getDate().toString().padStart(2, '0')}`,
      { ...options },
    )
  ).json();
};

export const setTodayData = async (today: Date, month: number) => {
  return await fetch(
    `${API_ADD}/api/budget/calendar?yearmonth=${today.getFullYear()}-${month.toString().padStart(2, '0')}`,
    { ...options },
  );
};
