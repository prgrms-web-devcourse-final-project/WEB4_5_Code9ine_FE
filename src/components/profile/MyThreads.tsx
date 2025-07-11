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
  const ThreadList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <SetGoal />
      <ThreadsTab selectedTab={selectedTab} onChange={setSelectedTab} />
      <div className="mt-[40px] flex w-full flex-col gap-[20px] p-[20px]">
        {ThreadList.map((prev, i) => (
          <div key={i}>
            <PostItem />
          </div>
        ))}

        {/* 내가 찜한 장소 */}
        {/* {ThreadList.map((prev, i) => (
          <div key={i} className="rounded-[10px] shadow dark:shadow-md">
            <DetailBox />
          </div>
        ))} */}
      </div>
    </>
  );
}
