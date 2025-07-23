'use client';

import { API_ADD } from '@/api/api';
import { useAccountData } from '@/stores/accountStore';
import { IoPencil, IoTrash } from 'react-icons/io5';

export default function CardMenu({ index }: { index: number }) {
  const { setIsAccount, setInsert, setIsId } = useAccountData();
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
  const handleChange = () => {
    setIsAccount('수정');
    setInsert(true);
    console.log('클릭됨');
    setIsId(index);
  };
  return (
    <>
      <div className="flex h-[35px] w-[80px] items-center justify-center rounded-[10px] bg-[var(--white-color)] shadow-md">
        <button
          className="flex w-[35px] cursor-pointer justify-center text-[16px]"
          onClick={handleChange}
        >
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
