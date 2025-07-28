export default function ProfileSkeleton() {
  return (
    <div className="mt-[40px] mb-[20px] flex w-full animate-pulse flex-col items-center justify-center">
      <div className="h-[120px] w-[120px] rounded-full bg-[var(--skeleton-bg)]" />
      <div className="mt-[10px] h-[24px] w-[150px] rounded bg-[var(--skeleton-bg)]" />
      <div className="mt-[5px] mb-[7px] h-[20px] w-[100px] rounded bg-[var(--skeleton-bg)]" />
      <div className="ml-[120px] h-[12px] w-[80px] rounded bg-[var(--skeleton-bg)]" />
      <div className="mt-[4px] h-[20px] w-[200px] rounded-[10px] bg-[var(--skeleton-bg)]" />
      <div className="mt-[10px] flex gap-[10px]">
        <div className="h-[40px] w-[150px] rounded-[10px] bg-[var(--skeleton-bg)]" />
        <div className="h-[40px] w-[150px] rounded-[10px] bg-[var(--skeleton-bg)]" />
      </div>
    </div>
  );
}
