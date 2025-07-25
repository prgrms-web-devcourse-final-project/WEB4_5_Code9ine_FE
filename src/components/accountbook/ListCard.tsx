'use client';
import { PayList } from '@/types/payData';
import CardMenu from './CardMenu';
import { IoEllipsisVertical } from 'react-icons/io5';
import MobileCardMenu from './MobileCardMenu';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Gimbab from '../../assets/icons/gimbab.png';
import Bus from '../../assets/icons/bus.png';
import Guitar from '../../assets/icons/guitar.png';
import Celebration from '../../assets/icons/celebration.png';
import Headphone from '../../assets/icons/headphone.png';
import Bag from '../../assets/icons/bag.png';
import Note from '../../assets/icons/note.png';
import Phone from '../../assets/icons/phone.png';
import Health from '../../assets/icons/health.png';
import Life from '../../assets/icons/life.png';
import Money from '../../assets/icons/money1.png';

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
            {value.category === '식비' ? (
              <Image src={Gimbab} alt="식비" height={30} width={30} />
            ) : null}
            {value.category === '교통' ? (
              <Image
                src={Bus}
                alt="교통"
                height={30}
                width={30}
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
            ) : null}
            {value.category === '여가' ? (
              <Image src={Headphone} alt="여가" height={30} width={30} />
            ) : null}
            {value.category === '경조사' ? (
              <Image src={Celebration} alt="경조사" height={30} width={30} />
            ) : null}
            {value.category === '쇼핑' ? (
              <Image src={Bag} alt="쇼핑" height={30} width={30} />
            ) : null}
            {value.category === '교육' ? (
              <Image src={Note} alt="교육" height={30} width={30} />
            ) : null}
            {value.category === '생활' ? (
              <Image src={Life} alt="생활" height={30} width={30} />
            ) : null}
            {value.category === '건강' ? (
              <Image src={Health} alt="건강" height={30} width={30} />
            ) : null}
            {value.category === '주거/통신' ? (
              <Image src={Phone} alt="주거/통신" height={30} width={30} />
            ) : null}
            {value.category === '기타' ? (
              <Image src={Guitar} alt="기타" height={30} width={30} />
            ) : null}
            {value.category === '용돈' ? (
              <Image src={Money} alt="기타" height={30} width={30} />
            ) : null}
            {value.category === '급여' ? (
              <Image src={Money} alt="기타" height={30} width={30} />
            ) : null}
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
