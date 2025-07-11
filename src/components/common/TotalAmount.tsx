import { DataList } from '@/types/payData';

export default function TotalAmount({
  data,
  textSize,
}: {
  data: DataList;
  textSize?: string;
}) {
  return (
<<<<<<< HEAD
    <div
      className={`flex flex-col justify-center ${textSize && `text-[${textSize}]`}`}
    >
=======
    <div className="flex flex-col justify-center text-[14px] md:text-[20px]">
>>>>>>> dev
      <div>
        <span>7월 9일까지의 총수입은 </span>
        <span className="text-[var(--main-color-3)]">
          {data.totalIncome.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
      <div>
        <span>7월 9일까지의 총지출은 </span>
        <span className="text-[var(--point-color-1)]">
          {data.totalExpense.toLocaleString('ko-KR')}
        </span>
        <span>원이에요</span>
      </div>
    </div>
  );
}
