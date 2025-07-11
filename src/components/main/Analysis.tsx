import TotalAmount from '../common/TotalAmount';
import GoalAnalysis from './GoalAnalysis';
import HalfYearAnalysis from './HalfYearAnalysis';

export default function Analysis() {
  return (
    <>
      <div className="content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[105px] md:w-[756px]">
        <TotalAmount />
      </div>
      <div className="flex">
        <div className="content-center justify-items-center rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:h-[350px] md:w-[368px]">
          <GoalAnalysis />
        </div>
        <div className="">
          <HalfYearAnalysis />
        </div>
      </div>
    </>
  );
}
