'use client';
import { MdEdit } from 'react-icons/md';
import SetGoalModal from './SetGoalModal';
import { useEffect, useState } from 'react';
// import { GetMyPageData } from '@/types/userType';
import { getMyPage } from '@/api/getMyPage';
// import { getSetGoal } from '@/api/getSetGoal';

export default function SetGoal() {
  const [isSetmodal, setIsSetModal] = useState(false);
  const [goalName, setGoalName] = useState<string | null>(null);
  const [remainAmount, setRemainAmount] = useState<number | null>(null);

  useEffect(() => {
    getMyPage()
      .then((res) => {
        console.log('성공:', res);
        setGoalName(res.data.goalStuff);
        setRemainAmount(res.data.remainPrice);
      })
      .catch((err) => console.log('마이페이지 에러', err));
  }, []);

  return (
    <>
      <div className="relative mt-[20px] flex h-[40px] w-full items-center justify-center bg-[var(--main-color-1)] md:items-center md:justify-center">
        {goalName && remainAmount ? (
          <h1 className="ml-[10px] gap-[40px] text-[16px] md:text-[20px] dark:text-[#2b2e34]">
            {goalName}까지
            <span className="text-[var(--main-color-3)]">
              {remainAmount}
            </span>{' '}
            남았어요. 끝까지 화이팅!
          </h1>
        ) : (
          <h1 className="ml-[10px] gap-[40px] text-[16px] md:text-[20px] dark:text-[#2b2e34]">
            아직 목표가 없어요. 목표를 설정해보아요!
          </h1>
        )}

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
