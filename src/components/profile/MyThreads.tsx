'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import ThreadsTab from './ThreadsTab';
import DetailBox from '../godplaces/detail/DetailBox';
import { useState } from 'react';

export default function MyThreads() {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );
  const threadList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <SetGoal />
      <ThreadsTab selectedTab={selectedTab} onChange={setSelectedTab} />

      {/* ✅ 탭에 따라 레이아웃 변경 */}
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
            ? threadList.map((_, i) => (
                <div key={i} className="rounded-[10px] shadow dark:shadow-md">
                  <DetailBox showBackButton={false} />
                </div>
              ))
            : null}
      </div>
    </>
  );
}
