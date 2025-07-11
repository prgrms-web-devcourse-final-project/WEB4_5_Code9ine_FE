import IconDiv from './IconDiv';

export default function SpendingAnalysisItem({
  id,
  color,
  percent,
  title,
  value,
}: {
  id: number;
  color: string;
  percent: string;
  title: string;
  value: number;
}) {
  return (
    <>
      <div className="flex items-center gap-[10px] border-b-[1px] border-b-[var(--main-color-3)] last:border-b-0 md:h-[34px]">
        <div
          className="rounded-[10px] text-center text-[12px] leading-[22px] text-[#2b2e34] md:h-[22px] md:w-[43px]"
          style={{ backgroundColor: color }}
        >
          {percent}%
        </div>
        <div className="flex gap-[8px]">
          <IconDiv id={id} />
          <div className="text-[16px] md:w-[68px]">{title}</div>
        </div>
        <div className="text-right text-[14px] md:w-[120px]">
          {value.toLocaleString()}원
        </div>
      </div>
    </>
  );
}
