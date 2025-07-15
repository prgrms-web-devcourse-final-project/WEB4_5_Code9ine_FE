import { client } from '@/lib/api/api';
import { CalendarList, totalData } from '@/types/payData';

export const fetchCalendarAccount = async (): Promise<CalendarList> => {
  const { data } = await client.get('/api/budget/calendar?yearmonth=2025%2F07');
  return data;
};

export const fetchTotlaAccount = async (): Promise<totalData> => {
  const { data } = await client.get('/api/budget/totaldetails');
  return data;
};
