export default function GoalSkeleton() {
  return (
    <div className="relative mt-[20px] flex h-[40px] w-full animate-pulse items-center justify-center bg-[var(--background)]">
      <div className="h-[20px] w-[70%] rounded bg-[var(--skeleton-bg)]" />
    </div>
  );
}
