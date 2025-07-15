'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import ThreadsTab from './ThreadsTab';
import DetailBox from '../godplaces/detail/DetailBox';
import { useState } from 'react';
// import DetailBox from '../godplaces/detail/DetailBox';
export default function MyThreads() {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );
  const threadList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <SetGoal />
      <ThreadsTab selectedTab={selectedTab} onChange={setSelectedTab} />

      <div className="mt-[40px] flex w-full flex-col gap-[20px] p-[20px]">
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
