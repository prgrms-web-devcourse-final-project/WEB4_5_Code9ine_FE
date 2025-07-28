export default function DetailCardSkeleton() {
  return (
    <div className="hide-scrollbar flex min-h-[180px] animate-pulse flex-col gap-[16px] overflow-y-scroll px-[18px] md:mt-[7px] md:h-auto md:gap-[20px] md:px-[25px]">
      <div className="flex flex-col gap-[14px] md:gap-[18px]">
        <div>
          <div className="mb-[3px] h-[20px] w-[50px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[24px]"></div>
          <div className="h-[26px] w-[180px] rounded-[10px] bg-[var(--skeleton-bg)] md:mb-[5px] md:h-[32px]"></div>
        </div>
        <div className="h-[18px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[20px]"></div>
        <div className="h-[35px] rounded-[10px] bg-[var(--skeleton-bg)] px-[8px] py-[11px] md:h-[40px]"></div>
      </div>
      <hr className="w-full border-[var(--gray-color-1)]" />
      <div className="h-[70px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[80px]"></div>
    </div>
  );
}
