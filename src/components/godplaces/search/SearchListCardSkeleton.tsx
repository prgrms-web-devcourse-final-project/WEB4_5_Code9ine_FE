export default function SearchListCardSkeleton() {
  return (
    <div className="h-[91px] w-full min-w-[310px] animate-pulse rounded-[10px] bg-[--white-color] px-[14px] py-[12px] shadow-[var(--shadow-md)] md:h-[100px] md:w-[324px]">
      <div className="mb-[3px] flex justify-between">
        <div className="h-[15px] w-[30px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[18px]"></div>
        <div className="h-[15px] w-[70px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[18px]"></div>
      </div>
      <div className="mb-[15px] h-[19px] w-[180px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[24px]"></div>
      <div className="h-[15px] w-[140px] rounded-[10px] bg-[var(--skeleton-bg)] md:h-[17px]"></div>
    </div>
  );
}
