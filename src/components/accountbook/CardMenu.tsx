'use client';

import { useDummyData } from '@/stores/dummyStore';

export default function CardMenu({ index }: { index: number }) {
  const { dummyData } = useDummyData();
  const { setDummy } = useDummyData.getState();
  const handleDelete = () => {
    dummyData.splice(index, 1);
    setDummy(dummyData);
  };
  return (
    <>
      <div className="flex h-[35px] w-[80px] items-center justify-center rounded-[10px] bg-[var(--white-color)] shadow-md">
        <button className="w-[35px] cursor-pointer text-[12px]">수</button>
        <span>|</span>
        <button
          className="w-[35px] cursor-pointer text-[12px]"
          onClick={handleDelete}
        >
          삭
        </button>
      </div>
    </>
  );
}
