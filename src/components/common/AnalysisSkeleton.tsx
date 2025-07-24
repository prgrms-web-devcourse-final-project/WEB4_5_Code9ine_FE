export default function SkeletonBox({ height }: { height: string }) {
  return (
    <div
      className={`w-full animate-pulse rounded-[10px] bg-gray-300 shadow-md dark:bg-gray-700 ${height}`}
    ></div>
  );
}
