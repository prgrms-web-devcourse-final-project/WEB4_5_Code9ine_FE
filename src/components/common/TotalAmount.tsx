'use client';
import { API_ADD } from '@/lib/api/api';
import { CalendarList } from '@/types/payData';
import { useEffect, useState } from 'react';

export default function TotalAmount({ textSize }: { textSize?: string }) {
  const [data, setData] = useState<CalendarList>();

  useEffect(() => {
    fetch(API_ADD + 'api/budget/totaldetails')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div
      className={`my-[10px] flex flex-col justify-center ${textSize ? `text-[${textSize}]` : 'text-[14px] md:text-[20px]'}`}
    >
      <div>
        <span>7월 9일까지의 총수입은 </span>
        <span className="text-[var(--main-color-3)]">
          {data?.data.totalIncome.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
      <div>
        <span>7월 9일까지의 총지출은 </span>
        <span className="text-[var(--point-color-1)]">
          {data?.data.totalExpense.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
    </div>
  );
}
