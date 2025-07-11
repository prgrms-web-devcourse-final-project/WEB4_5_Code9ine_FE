import PieChartClient from './PieChartClient';
import SpendingAnalysisItem from './SpendingAnalysisItem';

const dummyData = [
  { id: 0, name: '식비', value: 300000 },
  { id: 1, name: '교통', value: 300000 },
  { id: 2, name: '여가', value: 300000 },
  { id: 3, name: '경조사', value: 300000 },
  { id: 4, name: '쇼핑', value: 300000 },
  { id: 5, name: '교육', value: 300000 },
  { id: 6, name: '건강', value: 300000 },
  { id: 7, name: '기타', value: 300000 },
  { id: 8, name: '생활', value: 300000 },
  { id: 9, name: '주거/통신', value: 1300000 },
];

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

export default function SpendingAnalysis() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-[18px] md:w-[390px]">
        <div className="text-center text-[16px] md:h-[48px]">
          <div>
            <span className="text-[var(--main-color-3)]">이번 달 지출,</span>{' '}
            어디에 가장 많이 쓰셨을까요?
          </div>
          <div>OO님의 지출 패턴이에요.</div>
        </div>
        <div className="mb-[-35px] md:h-[270px]">
          <PieChartClient data={dummyData} colors={COLORS} />
        </div>
      </div>
      <div className="m-auto justify-items-center md:w-[350px]">
        {dummyData.map((d) => (
          <SpendingAnalysisItem
            key={d.id}
            id={d.id}
            color={COLORS[d.id]}
            percent={'42'}
            title={d.name}
            value={d.value}
          />
        ))}
      </div>
    </div>
  );
}
