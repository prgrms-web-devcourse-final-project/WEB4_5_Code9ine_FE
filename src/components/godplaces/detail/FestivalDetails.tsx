import DetailsItem from './DetailsItem';

export default function FestivalDetails({
  startAt,
  endAt,
  category,
  target,
}: {
  startAt?: string;
  endAt?: string;
  category?: string;
  target?: string;
}) {
  return (
    <div className="flex flex-col gap-[17px] md:gap-[25px]">
      <div className="flex h-[20px] items-start gap-[26px] md:h-auto">
        <div className="w-[69px] text-[16px] text-[var(--gray-color-2)] md:h-auto md:w-[76px] md:text-[20px]">
          축제기간
        </div>
        <div className="text-[14px] md:h-auto md:w-[160px] md:text-[16px]">
          {startAt} ~ {endAt}
        </div>
      </div>
      <div className="flex h-[20px] items-center gap-[26px] md:h-[25px]">
        <div className="w-[69px] text-[16px] text-[var(--gray-color-2)] md:w-[76px] md:text-[20px]">
          테마
        </div>
        <div className="text-[14px] md:w-[160px] md:text-[16px]">
          {category}
        </div>
      </div>
      <div className="flex h-[20px] items-center gap-[26px] md:h-[25px]">
        <div className="w-[69px] text-[16px] text-[var(--gray-color-2)] md:w-[76px] md:text-[20px]">
          주요고객
        </div>
        <div className="text-[14px] md:w-[160px] md:text-[16px]">{target}</div>
      </div>
      <div className="flex flex-col gap-[16px] md:gap-[17px]">
        <div className="text-[16px] text-[var(--gray-color-2)] md:text-[20px]">
          메뉴
        </div>
        <DetailsItem title="입장료" price="0" />
      </div>
    </div>
  );
}
