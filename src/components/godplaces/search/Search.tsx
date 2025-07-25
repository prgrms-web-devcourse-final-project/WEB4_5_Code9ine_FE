'use client';
import CategoryBox from './CategoryBox';
import HotLocation from '../HotLocation';
import SearchBox from './SearchBox';
import { startTransition, useEffect } from 'react';
import { getBookmarks } from '@/api/godplaces';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { useAuthStore } from '@/stores/authStore';

const TYPE = 'beforeSearch';

export default function Search() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const bookmarked = useGodplacesStore((state) => state.bookmarked);
  const setBookmarked = useGodplacesStore((state) => state.setBookmarked);

  useEffect(() => {
    startTransition(async () => {
      if (isLogin) {
        const bookmarkRes = await getBookmarks();
        if (bookmarkRes.code === '0000') {
          setBookmarked(bookmarkRes.data);
        }
      }
    });
  }, []);

  console.log(bookmarked);

  return (
    <div className="mt-[260px] flex min-w-[360px] flex-col items-center">
      <HotLocation />

      <SearchBox classType={TYPE} />
      <CategoryBox classType={TYPE} />
    </div>
  );
}
