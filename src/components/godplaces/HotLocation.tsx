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
      <div className="h-[63px] w-[234px] dark:text-[var(--text-color-dark)]">
        <div className="mb-[13px] h-[20px] text-center text-[15px]">
          오늘의 <span className="text-[var(--point-color-1)]">인기</span>{' '}
          검색어
        </div>
        <div className="h-[30px] overflow-hidden text-[20px]">
          <div className="animate-wiggle animate-up-down-slider flex flex-col">
            {[...dummyData.data, dummyData.data[0]].map((d, idx) => (
              <div key={idx} className="m-auto flex h-[30px] gap-[15px]">
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
