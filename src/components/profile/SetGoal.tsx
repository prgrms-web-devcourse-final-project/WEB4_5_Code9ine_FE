'use client';
import { MdEdit } from 'react-icons/md';
import SetGoalModal from './SetGoalModal';
import { useState } from 'react';
export default function SetGoal() {
  const [isSetmodal, setIsSetModal] = useState(false);
  return (
    <>
      <div className="relative mt-[20px] flex h-[40px] w-full items-center justify-center bg-[var(--main-color-1)] md:items-center md:justify-center">
        <h1 className="ml-[10px] gap-[40px] text-[16px] md:text-[20px] dark:text-[#2b2e34]">
          유럽 여행까지
          <span className="text-[var(--main-color-3)]"> 300만원</span> 남았어요.
          끝까지 화이팅!
        </h1>
        <button className="absolute right-3 cursor-pointer text-[var(--white-color)] hover:text-[var(--main-color-3)] dark:text-[var(--gray-color-2)]">
          <MdEdit size={20} onClick={() => setIsSetModal(true)} />
        </button>

        {isSetmodal && (
          <SetGoalModal onClose={() => setIsSetModal(false)}></SetGoalModal>
        )}
      </div>
    </>
  );
}
