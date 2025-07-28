export default function SkeletonBox({ height }: { height: string }) {
  return (
    <div
      className={`animate-pulse-fast w-full rounded-[10px] bg-[var(--skeleton-bg)] shadow-md ${height}`}
    ></div>
  );
}
