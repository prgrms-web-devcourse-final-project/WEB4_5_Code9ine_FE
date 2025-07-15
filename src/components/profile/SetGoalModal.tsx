import Button from '../../components/profile/Button';
import { MdCancel } from 'react-icons/md';
import { goalData } from '@/data/goalData';
import Image from 'next/image';
export default function SetGoalModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative h-[600px] w-[350px] rounded-[10px] bg-[var(--white-color)] p-[20px] shadow-[var(--shadow-md)]">
        {/* 닫기 버튼 */}
        <MdCancel
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-[30px] text-[var(--gray-color-2)]"
        />

        {/* 타이틀 */}
        <h1 className="mb-[20px] text-center text-[20px] font-semibold">
          <span className="text-[var(--main-color-3)]">목표</span>를
          설정해보세요!
        </h1>

        {/* 목표 리스트 */}
        <div className="flex flex-col items-center">
          {goalData.map((goal, index) => (
            <div
              key={index}
              className="flex w-[300px] items-center justify-between border-b border-[var(--main-color-3)] px-[5px] py-[8px] hover:text-[var(--main-color-3)]"
            >
              {/* 왼쪽: 아이콘 + 이름 */}
              <div className="flex items-center gap-[10px]">
                <Image
                  src={goal.icon}
                  width={25}
                  height={25}
                  alt="목표 아이콘"
                />
                <span className="text-[18px]">{goal.name}</span>
              </div>

              {/* 오른쪽: 가격 */}
              <span className="text-[18px]">{goal.price}</span>
            </div>
          ))}
        </div>

        {/* 선택 완료 버튼 */}
        <div className="absolute right-0 bottom-[25px] left-0 flex justify-center">
          <Button
            button={
              <button
                onClick={onClose}
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
