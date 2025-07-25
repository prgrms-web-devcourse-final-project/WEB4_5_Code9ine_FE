'use client';
import { getTodayStats } from '@/api/admin';
import { startTransition, useEffect, useState } from 'react';

type Stats = {
  date: string;
  signupCount: number;
  visitorCount: number;
};

export default function TodayStats() {
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getTodayStats();
        // console.log(response)

        if (response.code === '0000') {
          setStats(response.data);
        } else {
          console.error('Daily Stats Fetch Error');
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  return (
    <>
      {stats && (
        <div className="flex h-[90px] flex-col content-center gap-[10px] rounded-[10px] bg-[var(--white-color)] px-[10px] py-[15px] text-center shadow-[var(--shadow-md)]">
          <div>
            <h1 className="font-bold">TODAY&apos;S STATS</h1>
          </div>
          <div className="flex">
            <div className="flex-1/3">날짜 : {stats.date}</div>
            <div className="flex-1/3">방문자 수 : {stats.visitorCount}</div>
            <div className="flex-1/3">회원가입자 수 : {stats.signupCount}</div>
          </div>
        </div>
      )}
    </>
  );
}
