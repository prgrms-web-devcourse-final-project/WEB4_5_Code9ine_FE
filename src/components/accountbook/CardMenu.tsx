'use client';

import { IoPencil, IoTrash } from 'react-icons/io5';

export default function CardMenu({ index }: { index: number }) {
  const handleDelete = () => {
    console.log(index);
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
