export default function HotLocation() {
  const dummyData = {
    status: 'success',
    data: [
      { region: '서초구' },
      { region: '종로구' },
      { region: '강남구' },
      { region: '강북구' },
      { region: '성동구' },
    ],
  };

  return (
    <>
      <div className="h-[56px] w-[234px] md:h-[63px] dark:text-[var(--text-color-dark)]">
        <div className="mb-[16px] h-[17px] text-center text-[14px] md:mb-[13px] md:h-[20px] md:text-[16px]">
          오늘의 <span className="text-[var(--point-color-1)]">인기</span>{' '}
          검색어
        </div>
        <div className="h-[23px] overflow-hidden text-[16px] md:h-[30px] md:text-[20px]">
          <div className="animate-up-down-slider md:animate-up-down-slider-md flex flex-col">
            {[...dummyData.data, dummyData.data[0]].map((d, idx) => (
              <div
                key={idx}
                className="m-auto flex h-[23px] gap-[15px] md:h-[30px]"
              >
                <div className="w-[20px] text-center">
                  {(idx % dummyData.data.length) + 1}
                </div>
                <div>{d.region}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
