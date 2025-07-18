import PieChartClient from './PieChartClient';
import SpendingAnalysisItem from './SpendingAnalysisItem';

interface CategorySummary {
  category: string;
  totalAmount: number;
}

interface SpendingAnalysisProps {
  categorySummary: CategorySummary[];
}

const COLORS = [
  '#FD817F',
  '#FFAA00',
  '#FEE500',
  '#EFFF5B',
  '#77E517',
  '#BFEB94',
  '#C8FFAC',
  '#418ED6',
  '#B9D7FF',
  '#DCB5F4',
];

export default function SpendingAnalysis({
  categorySummary,
}: SpendingAnalysisProps) {
  const total = categorySummary.reduce(
    (sum, item) => sum + item.totalAmount,
    0,
  );

  // id 부여 + percent 계산
  const dataWithId = categorySummary.map((item, index) => ({
    id: index,
    name: item.category,
    value: item.totalAmount,
    percent: Math.round((item.totalAmount / total) * 100),
  }));

  return (
    <div className="items-center md:flex">
      <div className="flex flex-col gap-[18px] md:w-[390px]">
        <div className="h-[70px] text-center text-[16px] md:h-[48px]">
          <div>
            <span className="text-[var(--main-color-3)]">이번 달 지출,</span>{' '}
            어디에 가장 많이 쓰셨을까요?
          </div>
          <div>OO님의 지출 패턴이에요.</div>
        </div>
        <div className="mb-[10px] h-[270px] md:mb-[-35px] md:h-[270px]">
          <PieChartClient data={dataWithId} colors={COLORS} />
        </div>
      </div>
      <div className="m-auto justify-items-center md:w-[350px]">
        {dataWithId.map((d) => (
          <SpendingAnalysisItem
            key={d.id}
            id={d.id}
            color={COLORS[d.id % COLORS.length]}
            percent={d.percent.toString()}
            title={d.name}
            value={d.value}
          />
        ))}
      </div>
    </div>
  );
}
