'use client';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import toast from 'react-hot-toast';

export default function CategoryItem({
  type,
  classType,
}: {
  type: string;
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const router = useRouter();
  const location = useGodplacesStore((state) => state.location);
  const category = useGodplacesStore((state) => state.category);
  const setCategory = useGodplacesStore((state) => state.setCategory);

  const divSizeVariants = {
    beforeSearch:
      'h-[27px] md:h-[37px] px-[10px] md:px-[16px] text-[12px] md:text-[16px] leading-[26px] md:leading-[37px]',
    afterSearch:
      'h-[27px] md:h-[37px] px-[10px] md:px-[16px] text-[12px] md:text-[16px] leading-[26px] md:leading-[37px]',
  };

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedType = e.currentTarget.value;
    setCategory(clickedType);

    if (classType === 'afterSearch') {
      const newCategory = new Set(category);
      if (newCategory.has(clickedType)) {
        newCategory.delete(clickedType);
      } else {
        newCategory.add(clickedType);
      }

      if (location === '') {
        toast.error('지역을 입력해주세요');
        return;
      }

      const searchCategory =
        newCategory.size === 0 ? null : Array.from(newCategory).join(',');
      router.push(`/godplaces/${location}?category=${searchCategory}`);
    }
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
