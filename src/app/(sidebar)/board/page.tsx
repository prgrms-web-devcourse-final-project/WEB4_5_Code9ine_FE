'use client';

import PostItem from '@/components/board/PostItem';
import PostWriteForm from '@/components/board/PostWriteForm';

export default function page() {
  return (
    <>
      <div className="flex w-[756px] flex-col rounded-2xl bg-white p-4 shadow">
        <div className="mb-[25px]">
          <PostWriteForm />
        </div>
        <PostItem />
      </div>
    </>
  );
}
