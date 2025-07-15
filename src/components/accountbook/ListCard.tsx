'use client';
import { PayList } from '@/types/payData';
import CardMenu from './CardMenu';
import { IoEllipsisVertical } from 'react-icons/io5';
import MobileCardMenu from './MobileCardMenu';
import { useEffect, useState } from 'react';

export default function ListCard({
  value,
  index,
}: {
  value: PayList;
  index: number;
}) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('0원');

  useEffect(() => {
    setPrice(value.price.toLocaleString('ko-KR'));
  }, [value.price]);
  return (
    <>
      <div className="group relative mx-[3px] mb-[15px] flex min-h-[95px] items-center justify-center gap-[10px] rounded-[10px] bg-[var(--white-color)] px-[10px] py-[22px] shadow-md hover:z-50 md:w-[310px]">
        <div className="absolute left-[10px] flex gap-[10px]">
          <div className="flex size-[50px] items-center justify-center rounded-full bg-[var(--main-color-1)]">
            <span className="text-[25px]">{value.categoryIcon}</span>
          </div>
          <div>
            <p className="text-[var(--main-color-3)]">{value.category}</p>
            <p>{value.content}</p>
          </div>
        </div>
        {value.type === '지출' ? (
          <div className="absolute right-[20px]">
            <span className="ml-[26px] text-[var(--point-color-1)]">
              -{price}원
            </span>
          </div>
        ) : (
          <div className="absolute right-[20px]">
            <span className="ml-[26px] text-[var(--main-color-3)]">
              +{price}원
            </span>
          </div>
        )}
        <button
          className="absolute top-[10px] right-[10px] cursor-pointer md:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <IoEllipsisVertical size={10} />
        </button>
        <div
          className={`fixed inset-0 mt-[60px] transition-opacity duration-300 md:hidden ${openMenu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setOpenMenu(false)}
        ></div>
        {openMenu ? (
          <div className="absolute top-[10px] right-[10px] shadow">
            <MobileCardMenu index={index} />
          </div>
        ) : null}
        <div className="absolute top-[80px] right-[13px] hidden md:group-hover:flex">
          <CardMenu index={index} />
        </div>
      </div>
    </>
  );
}
