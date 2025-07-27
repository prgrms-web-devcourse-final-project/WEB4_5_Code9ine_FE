import Button from '../../components/profile/Button';
import { MdCancel } from 'react-icons/md';
import { goalData } from '@/data/goalData';
import Image from 'next/image';
import { useState } from 'react';
import { setGoal } from '@/api/profile';
import toast from 'react-hot-toast';

interface SetGoalModalProps {
  onClose: () => void;
  onGoalSet: () => void;
}

export default function SetGoalModal({
  onClose,
  onGoalSet,
}: SetGoalModalProps) {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  // 목표 선택
  const handleGoalSelect = (index: number) => {
    setSelectedGoal(index);
  };

  const submitGoal = async () => {
    if (selectedGoal === null) {
      toast.error('목표를 선택해주세요.');
      return;
    }
    const selected = goalData[selectedGoal];

    try {
      await setGoal(selected.name, selected.price);
      toast.success('목표가 설정되었습니다.');
      onGoalSet();
    } catch (err) {
      console.log('목표 저장 에러', err);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative h-[600px] w-[350px] rounded-[10px] bg-[var(--white-color)] p-[20px] shadow-[var(--shadow-md)]">
        <MdCancel
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-[30px] text-[var(--gray-color-2)]"
        />

        <h1 className="mb-[20px] text-center text-[20px] font-semibold">
          <span className="text-[var(--main-color-3)]">목표</span>를
          설정해보세요!
        </h1>

        <div className="flex flex-col items-center">
          {goalData.map((goal, index) => (
            <button
              onClick={() => handleGoalSelect(index)}
              key={index}
              className={`flex w-[300px] cursor-pointer items-center justify-between border-b border-[var(--main-color-3)] px-[5px] py-[8px] ${selectedGoal === index ? 'text-[20px] font-semibold text-[var(--main-color-3)]' : 'hover:text-[var(--main-color-3)]'}`}
            >
              <div className="flex items-center gap-[10px]">
                <Image
                  src={goal.icon}
                  width={25}
                  height={25}
                  alt="목표 아이콘"
                />
                <span className="text-[18px]">{goal.name}</span>
              </div>
              <span className="text-[18px]">
                {(goal.price / 10000).toLocaleString()}만원
              </span>
            </button>
          ))}
        </div>

        <div className="absolute right-0 bottom-[25px] left-0 flex justify-center">
          <Button
            button={
              <button
                onClick={submitGoal}
                className="h-[35px] w-[100px] rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]"
              >
                선택 완료
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
