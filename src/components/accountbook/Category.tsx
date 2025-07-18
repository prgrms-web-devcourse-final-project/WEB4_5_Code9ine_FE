'use client';
import { useAccountData } from '@/stores/accountStore';
import { useState } from 'react';

export default function Category({
  accountTag,
  handleTag,
}: {
  accountTag: string;
  handleTag: (arg0: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { setCategory } = useAccountData();
  const handleCategory = (value: string) => {
    setSelectedCategory(value);
    setCategory(selectedCategory);
    console.log(selectedCategory);
    handleTag(value);
  };
  const paidCategoryTag = [
    '식비',
    '교통',
    '여가',
    '경조사',
    '쇼핑',
    '교육',
    '생활',
    '건강',
    '주거/통신',
    '기타',
  ];

  const incomeCategoryTag = ['급여', '용돈', '기타'];
  return (
    <>
      {accountTag === '지출' ? (
        <div className="mt-[40px] grid size-[300px] grid-cols-3 gap-x-[10px] gap-y-[20px] rounded-[10px] px-[20px] py-[40px] shadow-md">
          {paidCategoryTag.map((v, i) => (
            <button
              className="h-[40px] w-[80px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-black active:bg-[var(--main-color-2)]"
              key={i}
              onClick={() => handleCategory(v)}
            >
              {v}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-[40px] grid size-[300px] grid-cols-3 gap-x-[10px] gap-y-[20px] rounded-[10px] px-[20px] py-[40px] shadow-md">
          {incomeCategoryTag.map((v, i) => (
            <button
              className="h-[40px] w-[80px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-black active:bg-[var(--main-color-2)]"
              key={i}
              onClick={() => handleCategory(v)}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
