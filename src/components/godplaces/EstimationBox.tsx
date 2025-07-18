import { useGodplacesStore } from '@/stores/godplacesStore';

export default function EstimationBox() {
  const plans = useGodplacesStore((state) => state.plans);

  const estimation = plans.reduce((prev, cur) => {
    return prev + cur.firstprice;
  }, 0);

  return (
    <div className="h-[31px] min-w-[330px] content-center rounded-[10px] bg-[var(--white-color)] text-center text-[12px] shadow-[var(--shadow-md)] md:h-[80px] md:w-[756px] md:text-[20px]">
      선택한 장소{' '}
      <span className="text-[var(--main-color-3)]">{plans.length}</span> 곳 방문
      시 최저 예상 금액은{' '}
      <span className="text-[var(--main-color-3)]">{estimation}</span> 원 입니다
    </div>
  );
}
