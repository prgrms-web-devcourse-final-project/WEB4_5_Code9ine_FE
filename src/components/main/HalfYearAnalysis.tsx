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
  return (
    <>
      <div className="text-center text-[16px]">
        <div>지출 패턴 분석 완료!</div>
        <div>
          {nickname || '사용자'}님의{' '}
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
