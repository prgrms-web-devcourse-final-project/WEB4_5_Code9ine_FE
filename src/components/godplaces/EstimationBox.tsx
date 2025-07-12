export default function EstimationBox() {
  return (
    <div className="h-[31px] min-w-[330px] content-center rounded-[10px] bg-[var(--white-color)] text-center text-[12px] shadow-[var(--shadow-md)] md:h-[80px] md:w-[756px] md:text-[20px]">
      선택한 장소 <span className="text-[var(--main-color-3)]">2</span> 곳 방문
      시 최저 예상 금액은{' '}
      <span className="text-[var(--main-color-3)]">6,000</span> 원 입니다
    </div>
  );
}
