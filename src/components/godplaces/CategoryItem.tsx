export default function CategoryItem({ type }: { type: string }) {
  return (
    <div className="h-[37px] w-[66px] cursor-pointer rounded-[20px] text-center text-[16px] leading-[37px] shadow-md hover:scale-105 hover:bg-[var(--main-color-2)] hover:shadow-none">
      {type}
    </div>
  );
}
