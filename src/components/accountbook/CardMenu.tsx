'use client';

import { useDummyData } from '@/stores/dummyStore';
import { IoPencil, IoTrash } from 'react-icons/io5';

export default function CardMenu({ index }: { index: number }) {
  const { dummyData } = useDummyData();
  const { setDummy } = useDummyData.getState();
  const handleDelete = () => {
    dummyData.dummy.splice(index, 1);
    setDummy(dummyData);
    console.log(dummyData.dummy);
  };
  return (
    <>
      <div className="flex h-[35px] w-[80px] items-center justify-center rounded-[10px] bg-[var(--white-color)] shadow-md">
        <button className="flex w-[35px] cursor-pointer justify-center text-[16px]">
          <IoPencil />
        </button>
        <span>|</span>
        <button
          className="flex w-[35px] cursor-pointer justify-center text-[16px]"
          onClick={handleDelete}
        >
          <IoTrash />
        </button>
      </div>
    </>
  );
}
