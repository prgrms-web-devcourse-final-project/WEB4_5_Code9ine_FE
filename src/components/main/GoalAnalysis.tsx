import Image from 'next/image';
import ProgressBar from '../common/ProgressBar';
import car from '../../assets/car.png';

interface GoalAnalysisProps {
  goal: {
    itemName: string;
    itemImage: string;
    itemPrice: number;
  };
  savedComparedToLastMonth: number;
}

export default function GoalAnalysis({
  goal,
  savedComparedToLastMonth,
}: GoalAnalysisProps) {
  const { itemName, itemImage, itemPrice } = goal;
  const percent = Math.min(
    Math.round((savedComparedToLastMonth / itemPrice) * 100),
    100,
  );

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div>
        <div className="text-center text-[16px] md:w-[263px]">
          저번 달보다{' '}
          <span className="text-[var(--main-color-3)]">
            {savedComparedToLastMonth.toLocaleString()}원
          </span>
          을 절약하셨네요!
        </div>
        <div className="text-center text-[16px] md:w-[263px]">
          이대로라면 1년 뒤에는 <br />
          {itemName}을 살 수 있겠군요!!
        </div>
      </div>

      <Image
        src={car}
        alt={itemName}
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
