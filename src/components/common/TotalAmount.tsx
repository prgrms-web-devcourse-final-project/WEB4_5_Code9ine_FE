'use client';
import { API_ADD, setMonthData } from '@/api/accountApi';
import { CalendarList } from '@/types/payData';
import { useEffect, useState } from 'react';

export default function TotalAmount({ textSize }: { textSize?: string }) {
  const [isData, setIsData] = useState<CalendarList>();
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

  useEffect(() => {
    // fetch(API_ADD + '/api/budget/totaldetails')
    //   .then((res) => res.json())
    //   .then((data) => setIsData(data));
    const today = new Date();
    const month = today.getMonth() + 1;
    async function calendarData() {
      // const res = await setMonthData(today, month);
      const data = await (
        await fetch(
          `${API_ADD}/api/budget/calendar?yearmonth=${today.getFullYear()}-${month.toString().padStart(2, '0')}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              accept: 'application/json',
              // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
            },
          },
        )
      ).json();
      console.log(data);
      setIsData(data);
    }
    calendarData();
    setMonth(today.getMonth() + 1);
    setDay(today.getDate());
  }, []);

  return (
    <div
      className={`my-[10px] flex flex-col justify-center ${textSize ? `text-[${textSize}]` : 'text-[14px] md:text-[20px]'}`}
    >
      <div>
        <span>{month}</span>
        <span>월 </span>
        <span>{day}</span>
        <span>일까지의 총수입은 </span>
        <span className="text-[var(--main-color-3)]">
          {isData?.data.totalIncome.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
      <div>
        <span>{month}</span>
        <span>월 </span>
        <span>{day}</span>
        <span>일까지의 총지출은 </span>
        <span className="text-[var(--point-color-1)]">
          {isData?.data.totalExpense.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
    </div>
  );
}
