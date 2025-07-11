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
      <div className="flex h-[40px] items-center gap-[10px] border-b-[1px] border-b-[var(--main-color-3)] last:border-b-0 md:h-[34px]">
        <div
          className="h-[30px] w-[56px] rounded-[10px] text-center text-[16px] leading-[30px] text-[#2b2e34] md:h-[22px] md:w-[43px] md:text-[12px] md:leading-[22px]"
          style={{ backgroundColor: color }}
        >
          {percent}%
        </div>
        <div className="flex gap-[11px] md:gap-[8px]">
          <IconDiv id={id} />
          <div className="w-[68px] text-[16px]">{title}</div>
        </div>
        <div className="w-[105px] text-right text-[16px] md:w-[120px] md:text-[14px]">
          {value.toLocaleString()}원
        </div>
      </div>
    </>
  );
}
