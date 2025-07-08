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
      <div className="flex h-[30px] items-center gap-[70px]">
        <div className="text-[15px]">
          오늘의 <span className="text-[var(--point-color-1)]">인기</span>{' '}
          검색어
        </div>
        <div className="h-[30px] overflow-hidden text-[20px]">
          <div className="animate-wiggle animate-up-down-slider flex flex-col">
            {[...dummyData.data, dummyData.data[0]].map((d, idx) => (
              <div key={idx} className="flex h-[30px] gap-[15px]">
                <div className="w-[60px] text-center">
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
