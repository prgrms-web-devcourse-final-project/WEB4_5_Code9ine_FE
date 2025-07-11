'use client';

import { useState } from 'react';
import AiChat from './AiChat';
import Calander from './Calander';
import ListArea from './ListArea';
import AccountAdd from './AccountAdd';
import TotalAmount from '../common/TotalAmount';
import { useDummyData } from '@/stores/dummyStore';

export default function Page() {
  const [isInsert, setIsInsert] = useState<boolean>(false);
  const { dummyData } = useDummyData();

  const handleMenu = (handle: boolean) => {
    setIsInsert(handle);
    console.log(handle);
  };
  return (
    <>
      <div className="md:flex md:gap-[15px]">
        <div className="md:flex md:flex-col">
          <div className="mx-[5px] mt-[9px] mb-[16px] flex text-[20px] md:mx-[13px]">
            <TotalAmount data={dummyData} />
            <div className="md:ml-[290px] md:size-[80px] md:rounded-full md:border-1 md:border-[var(--main-color-3)]"></div>
          </div>
          <Calander onDataChange={handleMenu} />
        </div>
        <div className="mt-[15px] flex h-[870px] flex-col md:mt-[0px]">
          <div className="flex w-full flex-col rounded-[10px] bg-[var(--white-color)] shadow-md md:max-h-[782px] md:w-[350px]">
            {isInsert ? <AccountAdd onDataChange={handleMenu} /> : <ListArea />}
          </div>
          <div className="hidden items-center justify-center md:flex">
            {isInsert ? null : <AiChat />}
          </div>
        </div>
      </div>
    </>
  );
}
