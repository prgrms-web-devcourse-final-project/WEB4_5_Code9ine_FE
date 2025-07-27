'use client';
import { getHotLocation } from '@/api/godplaces';
import { useEffect, useState, useTransition } from 'react';

export default function HotLocation() {
  const [hotLocations, setHotLocations] = useState<{ region: string }[]>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const hotLocations = await getHotLocation();
        setHotLocations(hotLocations.data);
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  const paddedHotLocations = hotLocations
    ? [
        ...hotLocations,
        ...Array.from({ length: 5 - hotLocations.length }, () => ({
          region: '-',
        })),
      ]
    : [];

  return (
    <>
      <div className="h-[56px] w-[234px] md:h-[63px] dark:text-[var(--text-color-dark)]">
        <div className="mb-[16px] h-[17px] text-center text-[14px] md:mb-[13px] md:h-[20px] md:text-[16px]">
          오늘의 <span className="text-[var(--point-color-1)]">인기</span>{' '}
          검색어
        </div>
        {isPending && (
          <div className="animate-pulse-fast h-[23px] overflow-hidden rounded-full bg-[var(--skeleton-bg)] text-[16px] md:h-[30px] md:text-[20px]"></div>
        )}
        {!isPending && (
          <div className="h-[23px] overflow-hidden text-[16px] md:h-[30px] md:text-[20px]">
            <div className="animate-up-down-slider md:animate-up-down-slider-md flex flex-col">
              {paddedHotLocations.map((d, idx) => (
                <div
                  key={idx}
                  className="m-auto flex h-[23px] gap-[15px] md:h-[30px]"
                >
                  <div className="w-[20px] text-center">
                    {(idx % paddedHotLocations.length) + 1}
                  </div>
                  <div>{d.region}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
