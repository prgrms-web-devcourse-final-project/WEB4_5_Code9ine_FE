export default function Empty() {
  return (
    <>
      <div className="col-span-full flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-12 text-center">
          <div className="text-[40px] font-bold text-[var(--text-color)] md:text-[50px]">
            teong
          </div>
          <div
            className="animate-bounce text-[100px] leading-none font-black text-[var(--text-color)] md:text-[140px]"
            style={{
              fontFamily:
                'Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif',
            }}
          >
            텅
          </div>
          <div className="text-[40px] font-bold text-[var(--main-color-3)] md:text-[50px]">
            emptily
          </div>
        </div>
      </div>
    </>
  );
}
