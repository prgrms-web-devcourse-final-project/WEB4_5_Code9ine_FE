// import { BsStar, BsStarFill } from 'react-icons/bs';
import Link from 'next/link';
import { BsStar } from 'react-icons/bs';
import { IoCheckmark } from 'react-icons/io5';

export default function SearchListCard({
  category,
  type,
  name,
  firstMenu,
  firstPrice,
}: {
  category: string | null;
  type: string;
  name: string;
  firstMenu?: string;
  firstPrice?: string;
}) {
  const TYPE_LABEL_MAP: Record<string, string> = {
    festival: '축제',
    library: '도서관',
  };

  const CATEGORY_LABEL_MAP: Record<string, string> = {
    미용업: '미용',
    세탁업: '세탁',
    숙박업: '숙박',
  };

  const getLabel = () => {
    if (type === 'store') {
      if (!category) return '착한가게';
      return CATEGORY_LABEL_MAP[category] ?? category;
    } else {
      return TYPE_LABEL_MAP[type];
    }
  };

  const label = getLabel();

  return (
    <Link
      href={`/godplaces/성수/detail`}
      className="h-[91px] w-full min-w-[310px] cursor-pointer rounded-[10px] bg-[--white-color] px-[14px] py-[12px] shadow-[var(--shadow-md)] hover:scale-101 md:h-[100px] md:w-[324px]"
    >
      <div className="flex justify-between">
        <div className="text-[12px] text-[var(--main-color-3)] md:text-[14px]">
          {label}
        </div>
        <div className="flex items-center gap-[6px] text-[10px] text-[var(--gray-color-2)] hover:text-[var(--main-color-3)]">
          <div>장소선택</div>
          <IoCheckmark className="text-[16px] md:text-[24px]" />
        </div>
      </div>
      <div className="mt-[-3px] mb-[10px] flex items-center gap-[7px] md:mt-[-5px] md:mb-[10px]">
        <div className="text-[16px] md:text-[20px]">{name}</div>
        <BsStar className="mt-[-2px] size-[12px] text-[var(--point-color-1)] md:size-[18px]" />
        {/* <BsStarFill className="mt-[-2px] size-[18px] text-[var(--point-color-1)]" /> */}
      </div>
      {type === 'store' && (
        <div className="flex gap-[6px] text-[12px] md:text-[14px]">
          <div>{firstMenu}</div>
          <div>{firstPrice}원</div>
        </div>
      )}
      {type !== 'store' && (
        <div className="flex gap-[6px] text-[12px] md:text-[14px]">
          <div>입장료</div>
          <div>0원</div>
        </div>
      )}
    </Link>
  );
}
