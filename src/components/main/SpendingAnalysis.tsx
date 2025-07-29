import PieChartClient from './PieChartClient';
import SpendingAnalysisItem from './SpendingAnalysisItem';

interface CategorySummary {
  category: string;
  totalAmount: number;
}

interface SpendingAnalysisProps {
  categorySummary: CategorySummary[];
  nickname: string;
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
  nickname,
}: SpendingAnalysisProps) {
  // 각 category에 색상 매핑
  const colorMap = new Map<string, string>();
  categorySummary.forEach((item, index) => {
    colorMap.set(item.category, COLORS[index % COLORS.length]);
  });

  // 차트용 0원 제외
  const filteredForChart = categorySummary.filter(
    (item) => item.totalAmount > 0,
  );
  const total = filteredForChart.reduce(
    (sum, item) => sum + item.totalAmount,
    0,
  );

  const chartData = filteredForChart.map((item) => ({
    id: item.category,
    name: item.category,
    value: item.totalAmount,
    percent: Math.round((item.totalAmount / total) * 100),
    color: colorMap.get(item.category) || '#ccc',
  }));

  // 목록용 0원 포함
  const listData = categorySummary.map((item) => ({
    id: item.category,
    name: item.category,
    value: item.totalAmount,
    percent: total === 0 ? 0 : Math.round((item.totalAmount / total) * 100),
    color: colorMap.get(item.category) || '#ccc',
  }));

  return (
    <div className="items-center md:flex">
      <div className="flex flex-col gap-[18px] md:w-[390px]">
        <div className="h-[70px] text-center text-[16px] md:h-[48px]">
          <div>
            <span className="text-[var(--main-color-3)]">이번 달 지출,</span>{' '}
            어디에 가장 많이 쓰셨을까요?
          </div>
          <div>{nickname || 'OO'}님의 지출 패턴이에요.</div>
        </div>
        <div className="mb-[10px] h-[270px] md:mb-[-35px] md:h-[270px]">
          <PieChartClient
            data={chartData.map(({ name, value, percent }) => ({
              id: name,
              name,
              value,
              percent,
            }))}
            colors={chartData.map((d) => d.color)}
          />
        </div>
      </div>
      <div className="m-auto justify-items-center md:w-[350px]">
        {listData.map((d, idx) => (
          <SpendingAnalysisItem
            key={d.id}
            id={idx}
            color={d.color}
            percent={d.percent.toString()}
            title={d.name}
            value={d.value}
          />
        ))}
      </div>
    </div>
  );
}
