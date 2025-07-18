'use client';
import { API_ADD } from '@/lib/api/api';
import { CalendarList } from '@/types/payData';
import { useEffect, useState } from 'react';

export default function TotalAmount({ textSize }: { textSize?: string }) {
  const [data, setData] = useState<CalendarList>();
  const [month, setMonth] = useState<number>();
  const [day, setDay] = useState<number>();

  useEffect(() => {
    fetch(API_ADD + 'api/budget/totaldetails')
      .then((res) => res.json())
      .then((data) => setData(data));
    const today = new Date();
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
          {data?.data.totalIncome.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
      <div>
        <span>{month}</span>
        <span>월 </span>
        <span>{day}</span>
        <span>일까지의 총지출은 </span>
        <span className="text-[var(--point-color-1)]">
          {data?.data.totalExpense.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
    </div>
  );
}
