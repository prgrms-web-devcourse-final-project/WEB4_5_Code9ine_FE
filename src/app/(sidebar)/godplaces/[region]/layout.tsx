'use client';
import { getBookmarks } from '@/api/godplaces';
import EstimationContainer from '@/components/godplaces/EstimationContainer';
import { useAuthStore } from '@/stores/authStore';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { startTransition, useEffect } from 'react';

export default function Layout({
  search,
  results,
}: {
  search: React.ReactNode;
  results: React.ReactNode;
}) {
  const isLogin = useAuthStore((state) => state.isLogin);
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
  }, [isLogin, setBookmarked]);

  return (
    <>
      <div className="mt-[15px] flex flex-1 flex-col gap-[15px] md:mt-[0px] md:flex-row">
        <div className="flex min-w-[330px] flex-col gap-[15px] rounded-[10px] md:h-[870px] md:w-[756px]">
          {search}
          <EstimationContainer />
        </div>
        {results}
      </div>
    </>
  );
}
