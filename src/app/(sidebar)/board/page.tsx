'use client';

import CommunityTab from '@/components/board/CommunityTab';
import PopularPostList from '@/components/board/PopularPostList';
import PostItem from '@/components/board/PostItem';
import PostWriteForm from '@/components/board/PostWriteForm';
import { useState } from 'react';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<
    'myHiddenStore' | 'challenge' | 'freeBoard'
  >('myHiddenStore');

  return (
    <>
      <div className="flex">
        <div className="hide-scrollbar flex h-[869px] w-[756px] flex-col overflow-y-auto rounded-[10px] bg-[var(--white-color)] p-4 shadow">
          <div className="mb-[25px]">
            <div className="mt-[15px] mb-[30px]">
              <CommunityTab
                selectedTab={selectedTab}
                onChange={setSelectedTab}
              />
            </div>
            <PostWriteForm />
          </div>
          <div className="mb-[25px]">
            <PostItem />
          </div>
          <div className="mb-[25px]">
            <PostItem />
          </div>
        </div>

        <div className="ml-[15px] flex h-[869px] w-[350px] flex-col rounded-[10px] shadow">
          <PopularPostList />
        </div>
      </div>
    </>
  );
}
