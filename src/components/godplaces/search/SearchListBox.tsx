'use client';
import { getBookmarks, getGodplaces } from '@/lib/api/godplaces';
import SearchListCard from './SearchListCard';
import { startTransition, useEffect } from 'react';
import { useGodplacesStore } from '@/stores/godplacesStore';

export default function SearchListBox({
  region,
  category,
}: {
  region: string;
  category: string;
}) {
  const godplaces = useGodplacesStore((state) => state.godplaces);
  const setGodplaces = useGodplacesStore((state) => state.setGodplaces);
  const bookmarked = useGodplacesStore((state) => state.bookmarked);
  const setBookmarked = useGodplacesStore((state) => state.setBookmarked);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getGodplaces(region, category);
        // console.log(res);
        setGodplaces(res.data);

        const bookmarkRes = await getBookmarks();
        if (bookmarkRes.code === '0000') {
          setBookmarked(bookmarkRes.data);
        }
      } catch (e) {
        console.error('god places fetch error', e);
      }
    });
  }, [region, category]);

  console.log(godplaces);
  console.log(bookmarked);

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

            return (
              <SearchListCard
                key={`${d.type}-${id}`}
                category={d.category}
                type={d.type}
                name={d.name}
                firstMenu={d.firstMenu}
                firstPrice={d.firstPrice}
                id={String(id)}
              />
            );
          })}
      </div>
    </div>
  );
}
