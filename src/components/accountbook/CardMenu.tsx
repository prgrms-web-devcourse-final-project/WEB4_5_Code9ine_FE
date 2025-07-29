'use client';

import { deleteAccount, setData } from '@/api/accountApi';
import { useAccountData } from '@/stores/accountStore';
import { PayList } from '@/types/payData';
import toast from 'react-hot-toast';
import { IoPencil, IoTrash } from 'react-icons/io5';

export default function CardMenu({
  index,
  value,
}: {
  index: number;
  value: PayList;
}) {
  const { setIsAccount, setInsert, setIsId, setTotaldata, setRewriteData } =
    useAccountData();
  const handleDelete = async () => {
    try {
      deleteAccount(index);
      const totalData = await setData(0);
      setTotaldata(totalData);
    } catch (e) {
      console.error(e);
      toast.error('문제가 발생했습니다');
    } finally {
      toast.success('삭제되었습니다');
    }
  };
  const handleChange = () => {
    setIsAccount('수정');
    setInsert(true);
    setIsId(index);
    setRewriteData(value);
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
