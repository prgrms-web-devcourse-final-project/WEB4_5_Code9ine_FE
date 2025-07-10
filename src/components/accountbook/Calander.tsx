export default function Calander() {
  return (
    <>
      <div className="relative h-[765px] w-[755px] rounded-[10px] bg-white shadow-md">
        <div className="absolute top-[36px] left-[565px] flex gap-[10px]">
          <button className="h-[30px] w-[120px] items-center justify-center rounded-[5px] bg-[var(--main-color-1)] text-[14px]">
            오늘 지출이 없어요!
          </button>
          <button className="size-[30px] rounded-[5px] bg-[var(--main-color-1)]">
            +
          </button>
        </div>
        <span>달력</span>
      </div>
    </>
  );
}
