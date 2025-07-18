import BarChartClient from './BarChartClient';

interface MonthlyExpense {
  month: string;
  amount: number;
}

interface HalfYearAnalysisProps {
  monthlyExpenses: MonthlyExpense[];
}

export default function HalfYearAnalysis({
  monthlyExpenses,
}: HalfYearAnalysisProps) {
  return (
    <>
      <div className="text-center text-[16px]">
        <div>지출 패턴 분석 완료!</div>
        <div>
          OO님의 <span className="text-[var(--main-color-3)]">지난 6개월</span>,
          이렇게 썼어요.
        </div>
      </div>
      <div className="h-[250px] w-[280px] md:w-[314px]">
        <BarChartClient monthlyExpenses={monthlyExpenses} />
      </div>
    </>
  );
}
