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
      <div className="hide-scrollbar w-320px mx-[17px] mt-[45px] mb-[25px] flex flex-col gap-[15px] md:overflow-scroll">
        {Object.keys(dateGroup).map((date) => (
          <div key={date}>
            <div className="mb-[15px] min-w-[315px] border-b-1 text-[var(--main-color-3)] dark:text-[var(--text-color)]">
              <p>{date}</p>
            </div>
            <div className="mb-[25px]">
              {dateGroup[date].map((item, index) => (
                <ListCard value={item} index={index} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
