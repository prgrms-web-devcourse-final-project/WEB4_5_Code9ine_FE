import ListCard from './ListCard';
import { useDummyData } from '@/stores/dummyStore';

export default function ListArea() {
  const { dummyData } = useDummyData();
  return (
    <>
      <span className="mt-[65px] ml-[24px] text-[24px] font-semibold">
        내역
      </span>
      <div className="overflow-scrolls mx-[17px] mt-[45px] flex flex-col gap-[15px]">
        <div className="border-b-1">
          <p>25.07.01</p>
        </div>
        {dummyData.dummy.map((v, i) => (
          <ListCard value={v} index={i} key={i} />
        ))}
      </div>
    </>
  );
}
