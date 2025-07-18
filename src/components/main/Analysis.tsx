'use client';
import TotalAmount from '../common/TotalAmount';
import GoalAnalysis from './GoalAnalysis';
import HalfYearAnalysis from './HalfYearAnalysis';
import SpendingAnalysis from './SpendingAnalysis';

import { useEffect, useState } from 'react';
import { getBudgetAnalysis } from '@/services/mainService';
import type { BudgetAnalyzeResponse } from '@/services/mainService';

export default function Analysis() {
  const [data, setData] = useState<BudgetAnalyzeResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getBudgetAnalysis();
        setData(res);
      } catch (e) {
        console.error('가계부 분석 데이터 가져오기 실패', e);
      }
    }
    fetchData();
  }, []);
  if (!data) return <div>로딩중...</div>;
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="h-[80px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[100px] md:w-[756px]">
        <TotalAmount />
      </div>
      <div className="flex flex-col gap-[15px] md:flex-row md:gap-[20px]">
        <div className="h-[400px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[350px] md:w-[368px]">
          <GoalAnalysis
            goal={data.goal}
            savedComparedToLastMonth={data.savedComparedToLastMonth}
          />
        </div>
        <div className="h-[400px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[350px] md:w-[368px]">
          <HalfYearAnalysis />
        </div>
      </div>
      <div className="h-[880px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[390px] md:w-[756px]">
        <SpendingAnalysis />
      </div>
    </div>
  );
}
