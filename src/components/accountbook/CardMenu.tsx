export default function CardMenu() {
  return (
    <>
      <div className="flex h-[25px] w-[70px] items-center justify-center rounded-[10px] bg-[var(--white-color)] shadow-md">
        <button className="w-[35px] cursor-pointer text-[12px]">수</button>
        <span>|</span>
        <button className="w-[35px] cursor-pointer text-[12px]">삭</button>
      </div>
    </>
  );
}
