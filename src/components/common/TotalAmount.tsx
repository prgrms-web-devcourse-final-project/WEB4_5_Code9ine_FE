import { useDummyData } from '@/stores/dummyStore';

export default function TotalAmount({ textSize }: { textSize?: string }) {
  const { dummyData } = useDummyData();

  return (
    <div
      className={`my-[10px] flex flex-col justify-center ${textSize ? `text-[${textSize}]` : 'text-[14px] md:text-[20px]'}`}
    >
      <div>
        <span>7월 9일까지의 총수입은 </span>
        <span className="text-[var(--main-color-3)]">
          {dummyData.totalIncome.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
      <div>
        <span>7월 9일까지의 총지출은 </span>
        <span className="text-[var(--point-color-1)]">
          {dummyData.totalExpense.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
    </div>
  );
}
