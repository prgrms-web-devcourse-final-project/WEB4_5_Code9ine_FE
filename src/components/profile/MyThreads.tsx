export default function MyThreads() {
  return (
    <>
      <div className="relative mt-[20px] flex h-[40px] w-full items-center justify-center bg-[var(--main-color-1)]">
        <h1 className="text-[20px]">
          유럽 여행까지{' '}
          <span className="text-[var(--main-color-3)]">300만원</span> 남았어요.
          끝까지 화이팅!
        </h1>
        <button className="absolute right-3 cursor-pointer text-[var(--white-color)]">
          목표 바꾸기
        </button>
      </div>
    </>
  );
}
