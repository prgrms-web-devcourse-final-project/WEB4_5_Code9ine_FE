import { PayList } from '@/types/payData';
import ListCard from './ListCard';
import { useDummyData } from '@/stores/dummyStore';

type GroupedByDate = Record<string, PayList[]>;

export default function ListArea() {
  const { dummyData } = useDummyData();
  const dateGroup = dummyData.dummy.reduce(
    (acc: GroupedByDate, curr: PayList) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    },
    {},
  );

  console.log(dateGroup);
  return (
    <>
      <span className="mt-[65px] ml-[24px] text-[24px] font-semibold">
        내역
      </span>
      <div className="mx-[17px] mt-[45px] flex flex-col gap-[15px] overflow-scroll">
        {Object.keys(dateGroup).map((date) => (
          <div key={date}>
            <div className="border-b-1">
              <p>{date}</p>
            </div>
            {dateGroup[date].map((item, index) => (
              <ListCard value={item} index={index} key={index} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
