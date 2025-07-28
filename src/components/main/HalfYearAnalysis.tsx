import Empty from '../profile/Empty';
import BarChartClient from './BarChartClient';

interface MonthlyExpense {
  month: string;
  amount: number;
}

interface HalfYearAnalysisProps {
  monthlyExpenses: MonthlyExpense[];
  nickname: string;
}

export default function HalfYearAnalysis({
  monthlyExpenses,
  nickname,
}: HalfYearAnalysisProps) {
  const allAmountsZero = monthlyExpenses.every((item) => item.amount === 0);

  if (allAmountsZero) {
    return (
      <div className="flex h-auto flex-col items-center justify-center text-center text-[16px] text-[var(--text-color)]">
        <div>
          <p className="mt-4">최근 6개월간 소비하신 내역이 없어요!</p>
          <Empty />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center text-[16px]">
        <div>지출 패턴 분석 완료!</div>
        <div>
          {nickname || 'OO'}님의{' '}
          <span className="text-[var(--main-color-3)]">지난 6개월</span>, 이렇게
          썼어요.
        </div>
      </div>
      <div className="h-[250px] w-[280px] md:w-[314px]">
        <BarChartClient monthlyExpenses={monthlyExpenses} />
      </div>
    </>
  );
}
