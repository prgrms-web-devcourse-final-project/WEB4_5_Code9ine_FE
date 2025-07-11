import Image from 'next/image';
import car from '../../assets/car.png';
import ProgressBar from '../common/ProgressBar';

const GOAL = '자동차';
const PERCENT = 70;

export default function GoalAnalysis() {
  return (
    <div className="flex flex-col items-center gap-[20px]">
      <div>
        <div className="text-center text-[16px] md:w-[263px]">
          저번 달보다{' '}
          <span className="text-[var(--main-color-3)]">300,000원</span>을
          절약하셨네요!
        </div>
        <div className="text-center text-[16px] md:w-[263px]">
          이대로라면 1년 뒤에는 <br />
          {GOAL}를 한 대 살 수 있겠군요!!
        </div>
      </div>
      <Image
        src={car}
        alt={GOAL}
        className="h-[140px] w-[140px] md:h-[113px] md:w-[113px]"
      ></Image>
      <div className="flex flex-col gap-[7px] md:gap-[5px]">
        <ProgressBar
          completed={PERCENT}
          width="240px"
          height="15px"
          bgColor="var(--main-color-3)"
          baseBgColor="var(--white-color)"
          labelVisible={false}
        />
        <div className="text-right text-[16px]">
          {GOAL}까지{' '}
          <span className="text-[var(--main-color-3)]">{PERCENT}%</span>
        </div>
      </div>
    </div>
  );
}
