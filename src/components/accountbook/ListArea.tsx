'use client';
import { PayList, totalData } from '@/types/payData';
import ListCard from './ListCard';
import { useEffect, useState } from 'react';
import { setDayData } from '@/api/accountApi';
import { useAccountData } from '@/stores/accountStore';

type GroupedByDate = Record<string, PayList[]>;

export default function ListArea() {
  const [totalData2, setTotalData] = useState<totalData | null>(null);
  const [day, setDay] = useState<totalData>();
  const { dateData, showDayData, totalData } = useAccountData();

  const dateGroup = (totalData2?.data.details ?? []).reduce(
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

  useEffect(() => {
    if (totalData !== undefined && totalData !== null) {
      setTotalData(totalData);
    }
    async function todayData() {
      const data = await setDayData(dateData);
      setDay(data);
    }
    todayData();
  }, [dateData, totalData]);

  return (
    <>
      <span className="mt-[30px] ml-[24px] text-[24px] font-semibold">
        내역
      </span>
      {!showDayData ? (
        <div className="hide-scrollbar w-320px mx-[17px] mt-[20px] mb-[25px] flex flex-col gap-[15px] md:overflow-scroll">
          {Object.keys(dateGroup).map((date) => (
            <div key={date}>
              <div className="mb-[15px] min-w-[315px] border-b-1 text-[var(--main-color-3)] dark:text-[var(--text-color)]">
                <p>{date}</p>
              </div>
              <div className="mb-[25px]">
                {dateGroup[date].map((item, index) => (
                  <ListCard value={item} index={item.id} key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="hide-scrollbar w-320px mx-[17px] mt-[20px] mb-[25px] flex flex-col gap-[15px] md:overflow-scroll">
          <div key={dateData?.toLocaleString()}>
            <div className="mb-[15px] min-w-[315px] border-b-1 text-[var(--main-color-3)] dark:text-[var(--text-color)]">
              <p>
                {dateData?.getFullYear() +
                  '-' +
                  (dateData!.getMonth() + 1).toString().padStart(2, '0') +
                  '-' +
                  dateData?.getDate().toString().padStart(2, '0')}
              </p>
            </div>
            <div className="mb-[25px]">
              {day?.data.details.map((item, index) => (
                <ListCard value={item} index={item.id} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
