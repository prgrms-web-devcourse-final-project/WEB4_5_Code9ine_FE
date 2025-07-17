'use client';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { MouseEvent } from 'react';

export default function CategoryItem({
  type,
  classType,
}: {
  type: string;
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const category = useGodplacesStore((state) => state.category);
  const setCategroy = useGodplacesStore((state) => state.setCategory);

  const divSizeVariants = {
    beforeSearch:
      'h-[27px] md:h-[37px] px-[10px] md:px-[16px] text-[12px] md:text-[16px] leading-[26px] md:leading-[37px]',
    afterSearch:
      'h-[27px] md:h-[37px] px-[10px] md:px-[16px] text-[12px] md:text-[16px] leading-[26px] md:leading-[37px]',
  };

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setCategroy(e.currentTarget.value);
  };

  return (
    <>
      <button
        className={`cursor-pointer rounded-[20px] border border-[var(--gray-color-1)] text-center hover:scale-105 hover:border-none hover:bg-[var(--main-color-2)] dark:border-none dark:shadow-[var(--shadow-md)] ${divSizeVariants[classType]} ${category.has(type) ? 'bg-[var(--main-color-2)] text-[#2b2e34]' : 'bg-[var(--white-color)]'}`}
        onClick={onClickHandler}
        value={type}
        type="button"
      >
        {type}
      </button>
    </>
  );
}
