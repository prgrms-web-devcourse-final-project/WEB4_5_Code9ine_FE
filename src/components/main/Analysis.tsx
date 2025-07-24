'use client';
import TotalAmount from '../common/TotalAmount';
import GoalAnalysis from './GoalAnalysis';
import HalfYearAnalysis from './HalfYearAnalysis';
import SpendingAnalysis from './SpendingAnalysis';
import SkeletonBox from '../../components/common/AnalysisSkeleton';
import { useEffect, useState } from 'react';
import { getBudgetAnalysis } from '@/services/mainService';
import type { BudgetAnalyzeResponse } from '@/services/mainService';
import { useAccountData } from '@/stores/accountStore';

export default function Analysis() {
  const [data, setData] = useState<BudgetAnalyzeResponse | null>(null);
  const { isLogin } = useAccountData();

  useEffect(() => {
    if (!isLogin) return; // 로그인 안 된 상태면 실행하지 않음

    async function fetchData() {
      try {
        const res = await getBudgetAnalysis();
        setData(res);
      } catch (e) {
        console.error('가계부 분석 데이터 가져오기 실패', e);
      }
    }

    fetchData();
  }, [isLogin]);
  console.log(data);
  if (!data) {
    return (
      <div className="flex flex-col gap-[15px]">
        <SkeletonBox height="h-[80px] md:h-[100px] md:w-[756px]" />
        <div className="flex flex-col gap-[15px] md:flex-row md:gap-[20px]">
          <SkeletonBox height="h-[400px] md:h-[350px] md:w-[368px]" />
          <SkeletonBox height="h-[400px] md:h-[350px] md:w-[368px]" />
        </div>
        <SkeletonBox height="h-[880px] md:h-[390px] md:w-[756px]" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="h-[80px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[100px] md:w-[756px]">
        <TotalAmount />
      </div>
      <div className="flex flex-col gap-[15px] md:flex-row md:gap-[20px]">
        <div className="h-[400px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[350px] md:w-[368px]">
          <GoalAnalysis
            goal={data.goal}
            totalsavedAmount={data.totalsavedAmount}
          />
        </div>
        <div className="h-[400px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[350px] md:w-[368px]">
          <HalfYearAnalysis monthlyExpenses={data.monthlyExpenses} />
        </div>
      </div>
      <div className="h-[880px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[390px] md:w-[756px]">
        <SpendingAnalysis categorySummary={data.categorySummary} />
      </div>
    </div>
  );
}
