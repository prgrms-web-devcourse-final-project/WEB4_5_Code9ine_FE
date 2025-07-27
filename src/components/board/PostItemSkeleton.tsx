export default function PostItemSkeleton() {
  return (
    <div className="relative mb-[15px] flex animate-pulse flex-col items-start gap-3 rounded-[10px] bg-[var(--background)] p-6 text-[var(--text-color-white)] shadow md:flex-row md:gap-6">
      <div className="flex min-w-[90px] flex-col items-center gap-2 md:flex-col">
        <div className="h-[30px] w-[30px] rounded-full bg-[var(--skeleton-bg)] md:h-[70px] md:w-[70px]" />
        <div className="flex flex-col items-center gap-1">
          <div className="h-[20px] w-[80px] rounded bg-[var(--skeleton-bg)]" />
          <div className="h-[16px] w-[60px] rounded bg-[var(--skeleton-bg)]" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <div className="h-[28px] w-[80%] rounded bg-[var(--skeleton-bg)]" />
        <div className="h-[20px] w-[100%] rounded bg-[var(--skeleton-bg)]" />
        <div className="h-[20px] w-[90%] rounded bg-[var(--skeleton-bg)]" />

        <div className="mt-2 flex gap-4">
          <div className="h-[200px] w-[150px] rounded-xl bg-[var(--skeleton-bg)]" />
          <div className="h-[200px] w-[150px] rounded-xl bg-[var(--skeleton-bg)]" />
        </div>
      </div>
    </div>
  );
}
