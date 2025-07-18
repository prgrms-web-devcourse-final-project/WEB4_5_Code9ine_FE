'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import ThreadsTab from './ThreadsTab';
import DetailBox from '../godplaces/detail/DetailBox';
import { useEffect, useState } from 'react';
import {
  getMyThreads,
  getBookmarkedThreads,
  getBookmarkedPlaces,
} from '@/api/profile';

type SimpleProps = {
  id: string;
  name: string;
  type: 'store' | 'festival' | 'library';
};
export default function MyThreads() {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );

  const threadList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<SimpleProps[]>([]);

  // 내가 찜한 갓플
  useEffect(() => {
    getBookmarkedPlaces().then((res) => {
      console.log('성공', res);
      const finalId = res.data.map((item) => {
        let id = '';
        switch (item.type) {
          case 'store':
            id = item.storeId;
            break;
          case 'festival':
            id = item.festivalId;
            break;
          case 'library':
            id = item.libraryId;
            break;
        }
        return {
          type: item.type,
          id,
          name: item.name,
        };
      });
      console.log('타입 추출', finalId);
      setBookmarkedPlaces(finalId);
    });
  }, [selectedTab]);

  return (
    <>
      <SetGoal />
      <ThreadsTab selectedTab={selectedTab} onChange={setSelectedTab} />
      <div
        className={`mt-[40px] w-full gap-[20px] p-[20px] ${
          selectedTab === 'place'
            ? 'grid grid-cols-1 md:grid-cols-2'
            : 'flex flex-col'
        }`}
      >
        {selectedTab === 'thread' || selectedTab === 'saved'
          ? threadList.map((_, i) => (
              <div key={i}>
                <PostItem />
              </div>
            ))
          : selectedTab === 'place'
            ? bookmarkedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="rounded-[10px] shadow dark:shadow-md"
                >
                  <DetailBox
                    type={place.type}
                    id={place.id}
                    showBackButton={false}
                  />
                </div>
              ))
            : null}
      </div>
    </>
  );
}
