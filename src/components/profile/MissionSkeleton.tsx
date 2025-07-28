export default function MissionSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center justify-center rounded-[10px] p-[10px]">
      <div className="mt-[10px] h-[36px] w-[160px] rounded bg-[var(--skeleton-bg)]" />
      <div className="mt-[5px] flex items-center gap-2">
        <div className="h-[25px] w-[25px] rounded-full bg-[var(--skeleton-bg)]" />
        <div className="h-[24px] w-[100px] rounded bg-[var(--skeleton-bg)]" />
      </div>
      <div className="mt-[5px] h-[47px] w-[47px] rounded-full bg-[var(--skeleton-bg)]" />
      <div className="mt-[5px] h-[30px] w-[100px] rounded-[10px] bg-[var(--skeleton-bg)]" />
    </div>
  );
}
