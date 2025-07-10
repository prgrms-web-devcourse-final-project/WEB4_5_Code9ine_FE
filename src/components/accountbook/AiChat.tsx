import TiTaeProfile from './TiTaeProfile';

export default function AiChat() {
  return (
    <>
      <div className="mt-[16px] flex h-[70px] w-[350px] items-center justify-center gap-[20px] rounded-[10px] border-1 bg-white">
        <TiTaeProfile />
        <input
          type="text"
          className="h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] placeholder:text-center focus:border-[var(--main-color-3)] focus:outline-none"
          placeholder="자산 관리에 대해 무엇이든 물어보세요!"
          name="AiChat"
        />
      </div>
    </>
  );
}
