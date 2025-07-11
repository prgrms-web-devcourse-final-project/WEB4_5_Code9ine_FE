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
      <div className="flex gap-[15px]">
        <div className="flex flex-col">
          <div className="mx-[13px] mt-[9px] mb-[16px] flex text-[20px]">
            <div className="flex flex-col justify-center">
              <div>
                <span>7월 9일까지의 총수입은 </span>
                <span className="text-[var(--main-color-3)]">
                  {dummyData.totalIncome.toLocaleString('ko-KR')}
                </span>
                <span>원이에요</span>
              </div>
              <div>
                <span>7월 9일까지의 총지출은 </span>
                <span className="text-[var(--point-color-1)]">
                  {dummyData.totalExpense.toLocaleString('ko-KR')}
                </span>
                <span>원이에요</span>
              </div>
            </div>
            <div className="ml-[290px] size-[80px] rounded-full border-1 border-[var(--main-color-3)]"></div>
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
