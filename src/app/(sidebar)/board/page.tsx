'use client';

import PopularPostList from '@/components/board/PopularPostList';
import PostItem from '@/components/board/PostItem';
import PostWriteForm from '@/components/board/PostWriteForm';

export default function page() {
  return (
    <>
      <div className="flex">
        <div className="hide-scrollbar flex h-[869px] w-[756px] flex-col overflow-y-auto rounded-[10px] bg-[var(--white-color)] p-4 shadow">
          <div className="mb-[25px]">
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
