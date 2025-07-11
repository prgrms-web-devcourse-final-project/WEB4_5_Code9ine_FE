'use client';

import { useState } from 'react';
import AiChat from './AiChat';
import Calander from './Calander';
import ListArea from './ListArea';
import AccountAdd from './AccountAdd';
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
          <div className="mx-[13px] mt-[9px] mb-[16px] flex text-[20px]">
            <div className="md:flex md:flex-col md:justify-center">
              <div>
                <span className="text-[14px] md:text-[20px]">
                  7월 9일까지의 총수입은
                </span>
                <span className="text-[14px] text-[var(--main-color-3)] md:text-[20px]">
                  {dummyData.totalIncome.toLocaleString('ko-KR')}
                </span>
                <span className="text-[14px] md:text-[20px]">원이에요</span>
              </div>
              <div>
                <span className="text-[14px] md:text-[20px]">
                  7월 9일까지의 총지출은
                </span>
                <span className="text-[14px] text-[var(--point-color-1)] md:text-[20px]">
                  {dummyData.totalExpense.toLocaleString('ko-KR')}
                </span>
                <span className="text-[14px] md:text-[20px]">원이에요</span>
              </div>
            </div>
            <div className="md:ml-[290px] md:size-[80px] md:rounded-full md:border-1 md:border-[var(--main-color-3)]"></div>
          </div>
          <Calander onDataChange={handleMenu} />
        </div>
        <div className="flex h-[870px] flex-col">
          <div className="flex h-full w-[350px] flex-col overflow-scroll rounded-[10px] bg-[var(--white-color)] pb-[20px] shadow-md">
            {isInsert ? <AccountAdd onDataChange={handleMenu} /> : <ListArea />}
          </div>
          {isInsert ? null : <AiChat />}
        </div>
      </div>
    </>
  );
}
