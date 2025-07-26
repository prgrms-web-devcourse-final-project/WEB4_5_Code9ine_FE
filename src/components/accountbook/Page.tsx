'use client';

import { useEffect, useState } from 'react';
import AiChat from './AiChat';
import Calander from './Calander';
import ListArea from './ListArea';
import AccountAdd from './AccountAdd';
import TotalAmount from '../common/TotalAmount';
import Image from 'next/image';
import AIBot from '../../assets/TiTae.svg';
import { useAccountData } from '@/stores/accountStore';
import { totalData } from '@/types/payData';

export default function Page({ totalData }: { totalData: totalData }) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isInsert, setIsInsert] = useState<boolean>(false);

  const { setTotaldata, insert } = useAccountData();

  const handleMenu = (handle: boolean) => {
    setIsInsert(handle);
  };

  useEffect(() => {
    setTotaldata(totalData);
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsInsert(insert);
  }, [insert]);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <div className="relative md:flex md:gap-[15px]">
        <div
          className={`absolute flex h-[92vh] md:hidden ${isInsert ? 'absolute z-50' : ''}`}
        >
          {isInsert ? <AccountAdd onDataChange={handleMenu} /> : null}
        </div>
        <div className="relative md:flex md:flex-col">
          <div className="mx-[15px] mt-[9px] mb-[16px] flex text-[20px] md:mx-[13px]">
            <TotalAmount />
            <div className="absolute right-[30px] md:ml-[290px] md:size-[80px] md:rounded-full md:border-1 md:border-[var(--main-color-3)]"></div>
          </div>
          <Calander onDataChange={handleMenu} />
        </div>
        <div className="mt-[15px] flex flex-col md:mt-[0px] md:h-[870px]">
          <div
            className={`hidden w-full flex-col rounded-[10px] bg-[var(--white-color)] shadow-md md:flex ${isInsert ? 'md:h-[870px]' : 'md:h-[785px]'} md:min-h-[100px] md:w-[350px]`}
          >
            {isInsert ? <AccountAdd onDataChange={handleMenu} /> : <ListArea />}
          </div>
          <div className="hidden items-center justify-center md:flex">
            {isInsert ? null : <AiChat />}
          </div>
          <div className="mt-[40px] md:hidden">
            <ListArea />
          </div>
        </div>
        <div className="fixed right-[20px] bottom-[20px] z-70 flex size-[60px] items-center justify-center overflow-hidden rounded-full border-[var(--main-color-2)] bg-[var(--white-color)] shadow-md md:hidden">
          <Image src={AIBot} height={55} alt="titae" />
        </div>
      </div>
    </>
  );
}
