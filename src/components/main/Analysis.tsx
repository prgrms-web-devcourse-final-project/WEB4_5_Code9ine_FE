'use client';
import { useDummyData } from '@/stores/dummyStore';
import TotalAmount from '../common/TotalAmount';
import GoalAnalysis from './GoalAnalysis';
import HalfYearAnalysis from './HalfYearAnalysis';
import SpendingAnalysis from './SpendingAnalysis';

export default function Analysis() {
  const { dummyData } = useDummyData();
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="h-[80px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[100px] md:w-[756px]">
        <TotalAmount data={dummyData} />
      </div>
      <div className="flex flex-col gap-[15px] md:flex-row md:gap-[20px]">
        <div className="h-[400px] content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[350px] md:w-[368px]">
          <GoalAnalysis />
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
