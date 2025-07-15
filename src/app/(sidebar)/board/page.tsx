'use client';

import CommunityTab from '@/components/board/CommunityTab';
import PopularPostList from '@/components/board/PopularPostList';
import PostItem from '@/components/board/PostItem';
import PostWriteForm from '@/components/board/PostWriteForm';
import TopButton from '@/components/board/TopButton';
import { useState } from 'react';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<
    'myHiddenStore' | 'challenge' | 'freeBoard'
  >('myHiddenStore');

  return (
    <>
      <div className="flex w-full max-w-screen flex-col px-[15px] md:flex-row md:px-[0px]">
        <div className="hide-scrollbar order-1 ml-0 flex max-h-[310px] flex-1 flex-col overflow-y-auto rounded-[10px] shadow md:order-2 md:ml-[15px] md:h-[869px] md:max-h-none md:w-[350px]">
          <PopularPostList />
        </div>

        <div
          id="scrollTop-content"
          className="hide-scrollbar relative order-2 mt-[15px] flex h-[869px] w-full flex-col overflow-y-auto rounded-[10px] bg-[var(--white-color)] p-4 shadow md:order-1 md:mt-0 md:w-[756px]"
        >
          <div className="mb-[25px]">
            <div className="mt-[15px] mb-[30px]">
              <CommunityTab
                selectedTab={selectedTab}
                onChange={setSelectedTab}
              />
            </div>
            <PostWriteForm />
          </div>
          <div className="mb-[15px]">
            <PostItem />
          </div>
          <div className="mb-[15px]">
            <PostItem />
          </div>
          <div className="mb-[15px]">
            <PostItem />
          </div>
          <div className="mb-[15px]">
            <PostItem />
          </div>
          <div className="mb-[15px]">
            <PostItem />
          </div>
          <div className="mb-[15px]">
            <PostItem />
          </div>
          <TopButton scrollTargetId="scrollTop-content" />
        </div>
      </div>
    </>
  );
}
