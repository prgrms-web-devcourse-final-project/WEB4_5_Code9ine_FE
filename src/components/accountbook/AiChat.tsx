import TiTaeProfile from './TiTaeProfile';

export default function AiChat() {
  return (
    <>
      <div className="relative mt-[16px] flex h-[70px] w-[350px] flex-col items-center rounded-[10px] bg-[var(--white-color)] shadow-md transition-[height] focus-within:h-[265px]">
        <div className="absolute bottom-[10px] flex gap-[20px]">
          <TiTaeProfile />
          <input
            type="text"
            className="h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] placeholder:text-center focus:border-[var(--main-color-3)] focus:outline-none"
            placeholder="자산 관리에 대해 무엇이든 물어보세요!"
            id="AiChat"
          />
        </div>
      </div>
    </>
  );
}
