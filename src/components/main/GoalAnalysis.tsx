import Image from 'next/image';
import ProgressBar from '../common/ProgressBar';
import car from '../../assets/car.png';
import { goalData } from '@/data/goalData';

interface GoalAnalysisProps {
  goal: {
    itemName: string;
    itemPrice: number;
  };
  totalsavedAmount: number;
}

export default function GoalAnalysis({
  goal,
  totalsavedAmount,
}: GoalAnalysisProps) {
  const { itemName, itemPrice } = goal;

  const percent = Math.min(
    Math.round((totalsavedAmount / itemPrice) * 100),
    100,
  );

  const goalItem = goalData.find((item) => item.name === itemName);
  const itemIcon = goalItem?.icon || car;

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div>
        <div className="text-center text-[16px] md:w-[263px]">
          총{' '}
          <span className="text-[var(--main-color-3)]">
            {totalsavedAmount.toLocaleString()}원
          </span>
          을 절약하셨네요!
        </div>
        <div className="text-center text-[16px] md:w-[263px]">
          {totalsavedAmount >= itemPrice ? (
            <>
              이제{' '}
              <span className="text-[var(--main-color-3)]">{itemName}</span>을
              구매할 수 있어요!
            </>
          ) : (
            <>
              목표까지{' '}
              <span className="text-[var(--main-color-3)]">
                {(itemPrice - totalsavedAmount).toLocaleString()}원
              </span>{' '}
              남았어요!
            </>
          )}
        </div>
      </div>

      <Image
        src={itemIcon}
        alt="목표상품"
        width={140}
        height={140}
        className="md:h-[113px] md:w-[113px]"
      />

      <div className="flex flex-col gap-[7px] md:gap-[5px]">
        <ProgressBar
          completed={percent}
          width="240px"
          height="15px"
          bgColor="var(--main-color-3)"
          baseBgColor="var(--white-color)"
          labelVisible={false}
        />
        <div className="text-right text-[16px]">
          {itemName}까지{' '}
          <span className="text-[var(--main-color-3)]">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
