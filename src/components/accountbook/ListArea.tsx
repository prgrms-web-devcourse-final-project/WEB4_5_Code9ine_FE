'use client';
import { PayList, totalData } from '@/types/payData';
import ListCard from './ListCard';
import { useEffect, useRef, useState } from 'react';
import { setData, setDayData } from '@/api/accountApi';
import { useAccountData } from '@/stores/accountStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import ListCardSkeleton from './ListCardSkeleton';

type GroupedByDate = Record<string, PayList[]>;

export default function ListArea() {
  const [day, setDay] = useState<totalData>();
  const { dateData, showDayData, setShowDayData } = useAccountData();
  const viewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef(null);

  const [loadingDay, setLoadingDay] = useState(false);

  const newTotalData = useAccountData((state) => state.totalData);

  const fetchData = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const fetchedData = await setData(pageParam);
    return fetchedData;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['totalData', newTotalData],
      queryFn: fetchData,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined;
      },
    });

  const allDetails = data?.pages.flatMap((page) => page.data.details) ?? [];

  const dateGroup = allDetails.reduce((acc: GroupedByDate, curr: PayList) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  // 스크롤 옵저버
  useEffect(() => {
    if (!viewRef.current || !listRef.current) return;

    const options = {
      root: listRef.current,
      rootMargin: '0px',
      threshold: 0,
    };

    const fetchCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage?.();
          // observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(fetchCallback, options);

    if (viewRef.current) {
      observer.observe(viewRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    async function todayData() {
      if (!dateData) return;

      try {
        setLoadingDay(true);
        const data = await setDayData(dateData);
        setDay(data);
      } finally {
        setLoadingDay(false);
      }
    }
    todayData();
  }, [dateData]);

  return (
    <>
      <div className="mt-[30px] ml-[24px] flex items-center gap-[250px]">
        <span className="text-[24px] font-semibold">내역</span>
        {showDayData ? (
          <button
            className="cursor-pointer"
            onClick={() => setShowDayData(false)}
          >
            x
          </button>
        ) : null}
      </div>
      {!showDayData ? (
        <div
          className="hide-scrollbar w-320px mx-[17px] mt-[20px] mb-[25px] flex flex-col gap-[15px] md:overflow-scroll"
          ref={listRef}
        >
          {!data ? (
            <div className="flex animate-pulse flex-col gap-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <ListCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <>
              {Object.keys(dateGroup).map((date) => (
                <div key={date}>
                  <div className="mb-[15px] min-w-[315px] border-b-1 text-[var(--main-color-3)] dark:text-[var(--text-color)]">
                    <p>{date}</p>
                  </div>
                  <div className="mb-[25px]">
                    {dateGroup[date].map((item: PayList, index: number) => (
                      <ListCard value={item} index={item.id} key={index} />
                    ))}
                  </div>
                </div>
              ))}
              <div ref={viewRef} className="h-[1px]"></div>

              {isFetchingNextPage && (
                <div className="flex animate-pulse flex-col gap-4">
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <ListCardSkeleton key={`more-${idx}`} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="hide-scrollbar w-320px mx-[17px] mt-[20px] mb-[25px] flex flex-col gap-[15px] md:overflow-scroll">
          {loadingDay ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: day?.data.details.length || 0 }).map(
                (_, idx) => (
                  <ListCardSkeleton key={idx} />
                ),
              )}
            </div>
          ) : (
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
                {day?.data.details.map((item: PayList, index: number) => (
                  <ListCard value={item} index={item.id} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
