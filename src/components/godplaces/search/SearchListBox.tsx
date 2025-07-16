'use client';
import { getGodplaces } from '@/lib/api/godplaces';
import SearchListCard from './SearchListCard';
import { startTransition, useEffect, useState } from 'react';
import { GodplacesSearchList } from '@/types/godplaces';

export default function SearchListBox({
  region,
  category,
}: {
  region: string;
  category: string;
}) {
  const [godplaces, setGodplaces] = useState<GodplacesSearchList[]>();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getGodplaces(region, category);
        console.log(res);
        setGodplaces(res.data);
      } catch (e) {
        console.error('god places fetch error', e);
      }
    });
  }, [region, category]);

  return (
    <div className="flex flex-1 flex-col py-[13px] md:h-full md:py-[28px]">
      <div className="mb-[10px] pl-[10px] text-[16px] text-[var(--gray-color-2)] md:mb-[18px] md:pl-[12px] md:text-[20px]">
        검색 결과
      </div>
      <div className="hide-scrollbar flex h-[35dvh] flex-col items-center gap-[8px] overflow-y-auto px-[10px] pt-[4px] md:h-[782px] md:gap-[13px] md:px-[0px]">
        {!godplaces && '로딩중'}
        {godplaces && godplaces.length === 0 && '검색 결과가 없습니다'}
        {godplaces &&
          godplaces.map((d) => {
            const id = d[`${d.type}Id` as keyof typeof d];

            if (typeof id !== 'string') return null;

            return (
              <SearchListCard
                key={`${d.type}-${id}`}
                category={d.category}
                type={d.type}
                name={d.name}
                firstMenu={d.firstmenu}
                firstPrice={d.firstprice}
                id={id}
              />
            );
          })}
      </div>
    </div>
  );
}
