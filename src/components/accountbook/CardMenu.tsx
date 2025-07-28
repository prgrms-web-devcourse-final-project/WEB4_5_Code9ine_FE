'use client';

import { deleteAccount, setData } from '@/api/accountApi';
import { useAccountData } from '@/stores/accountStore';
import { PayList } from '@/types/payData';
import { IoPencil, IoTrash } from 'react-icons/io5';

export default function CardMenu({ index, value }: { index: number, value:PayList }) {
  const { setIsAccount, setInsert, setIsId, setTotaldata, setRewriteData } = useAccountData();
  const handleDelete = async () => {
    deleteAccount(index);
    const totalData = await setData(0);
    setTotaldata(totalData);
  };
  const handleChange = () => {
    setIsAccount('수정');
    setInsert(true);
    console.log('클릭됨');
    setIsId(index);
    setRewriteData(value)
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
