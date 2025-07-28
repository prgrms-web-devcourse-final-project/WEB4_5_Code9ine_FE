export default function TitleSwiperSkeleton() {
  return (
    <div className="relative h-[60px] w-full overflow-hidden rounded bg-[var(--background)]">
      <div className="absolute top-0 left-0 flex h-full animate-pulse items-center gap-6 px-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="h-[25px] w-[25px] rounded-full bg-[var(--skeleton-bg)]" />
            <div className="h-[16px] w-[80px] rounded bg-[var(--skeleton-bg)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
