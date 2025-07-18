'use client';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { useRouter } from 'next/navigation';
import { ChangeEvent, KeyboardEvent } from 'react';
import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';

export default function SearchBox({
  classType,
}: {
  classType: 'beforeSearch' | 'afterSearch';
}) {
  const router = useRouter();
  const location = useGodplacesStore((state) => state.location);
  const setLocation = useGodplacesStore((state) => state.setLocation);
  const category = useGodplacesStore((state) => state.category);

  const divSizeVariants = {
    beforeSearch:
      'h-[55px] md:h-[65px] min-w-[274px] md:w-[850px] gap-[18px] md:gap-[20px] mb-[20px] md:mb-[18px] mt-[46px] md:mt-[50px] mx-[43px] md:mx-[0px]',
    afterSearch:
      'h-[55px] md:h-[65px] min-w-[330px] md:w-[756px] gap-[18px] md:gap-[20px] mb-[7px] md:mb-[10px]',
  };

  const iconSizeVariants = {
    beforeSearch: 'size-[20px] md:size-[30px]',
    afterSearch: 'size-[20px] md:size-[30px]',
  };

  const inputSizeVariants = {
    beforeSearch:
      'h-[50px] md:h-[51px] min-w-[180px] md:w-[500px] text-[16px] md:text-[20px]',
    afterSearch:
      'h-[50px] md:h-[51px] min-w-[180px] md:w-[500px] text-[16px] md:text-[20px]',
  };

  const inputColorVariants = {
    beforeSearch: 'text-[var(--gray-color-2)]',
    afterSearch: 'text-[var(--text-color-white)]',
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // console.log(location);
      // console.log(category);
      if (e.currentTarget.value.trim() === '') {
        toast.error('지역을 입력해주세요');
        return;
      }

      const searchCategory =
        category.size === 0 ? null : Array.from(category).join(',');
      router.push(
        `/godplaces/${e.currentTarget.value.trim()}?category=${searchCategory}`,
      );
    }
    // console.log(e);
  };

  return (
    <div className="w-full md:w-[850px]">
      <div
        className={`flex items-center rounded-[10px] bg-[var(--white-color)] px-[24px] shadow-[var(--shadow-md)] ${divSizeVariants[classType]}`}
      >
        <CiSearch
          className={`-scale-x-100 fill-[var(--gray-color-2)] stroke-[var(--gray-color-2)] stroke-[0.5px] ${iconSizeVariants[classType]}`}
        />
        <input
          type="text"
          placeholder="Ex. 성동구"
          className={`focus:outline-none ${inputSizeVariants[classType]} ${inputColorVariants[classType]}`}
          onChange={inputHandler}
          value={location}
          onKeyDown={searchHandler}
        />
      </div>
    </div>
  );
}
