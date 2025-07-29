export default function ListCardSkeleton() {
  return (
    <div className="group relative mx-[3px] mb-[15px] flex min-h-[95px] animate-pulse items-center justify-between gap-[10px] rounded-[10px] bg-[var(--white-color)] px-[10px] py-[22px] shadow-md md:w-[310px]">
      <div className="flex items-center gap-[10px]">
        <div className="h-[50px] w-[50px] rounded-full bg-[var(--skeleton-bg)]" />
        <div className="flex flex-col gap-2">
          <div className="h-[14px] w-[60px] rounded bg-[var(--skeleton-bg)]" />
          <div className="h-[12px] w-[100px] rounded bg-[var(--skeleton-bg)]" />
        </div>
      </div>

      <div className="h-[16px] w-[50px] rounded bg-[var(--skeleton-bg)]" />
    </div>
  );
}
