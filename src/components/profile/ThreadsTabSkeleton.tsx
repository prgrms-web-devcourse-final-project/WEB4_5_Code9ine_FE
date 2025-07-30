export default function ThreadsTabSkeleton() {
  return (
    <div className="border-b-2px relative mx-auto mt-[40px] flex w-fit justify-center border-[var(--main-color-1)]">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="relative mx-[7px] py-2">
          <div className="h-[24px] w-[100px] animate-pulse rounded-[4px] bg-[var(--skeleton-bg)] md:h-[28px] md:w-[120px]" />
        </div>
      ))}
    </div>
  );
}
