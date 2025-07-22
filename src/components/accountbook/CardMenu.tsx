'use client';

import { API_ADD } from '@/lib/api/api';
import { IoPencil, IoTrash } from 'react-icons/io5';

export default function CardMenu({ index }: { index: number }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(API_ADD + `/api/budget/detail/${index}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('통신에 실패했습니다');

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
