// import { BsStar, BsStarFill } from 'react-icons/bs';
import { getLabel } from '@/lib/helper/getLabel';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';
import BookmarkButton from '../common/BookmarkButton';
import { useParams } from 'next/navigation';
import { useGodplacesStore } from '@/stores/godplacesStore';

export default function SearchListCard({
  category,
  type,
  name,
  firstMenu,
  firstPrice,
  id,
}: {
  category: string | null;
  type: string;
  name: string;
  firstMenu?: string;
  firstPrice?: string;
  id: number;
}) {
  const { region } = useParams();
  const label = getLabel(type, category);
  const plans = useGodplacesStore((state) => state.plans);
  const setPlans = useGodplacesStore((state) => state.setPlans);

  const addPlans = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setPlans({ type: type, id: id, firstprice: Number(firstPrice) || 0 });
  };

  return (
    <Link
      href={`/godplaces/${region}/detail?type=${type}&id=${id}`}
      className="h-[91px] w-full min-w-[310px] cursor-pointer rounded-[10px] bg-[--white-color] px-[14px] py-[12px] shadow-[var(--shadow-md)] hover:scale-101 md:h-[100px] md:w-[324px]"
    >
      <div className="flex justify-between">
        <div className="text-[12px] text-[var(--main-color-3)] md:text-[14px]">
          {label}
        </div>
        {plans.some((plan) => plan.id === id && plan.type === type) ? (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-[6px] text-[10px] text-[var(--main-color-3)]"
            onClick={addPlans}
          >
            <div>장소선택</div>
            <IoCheckmark className="text-[16px] md:text-[24px]" />
          </button>
        ) : (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-[6px] text-[10px] text-[var(--gray-color-2)] hover:text-[var(--main-color-3)]"
            onClick={addPlans}
          >
            <div>장소선택</div>
            <IoCheckmark className="text-[16px] md:text-[24px]" />
          </button>
        )}
      </div>
      <div className="mt-[-3px] mb-[10px] flex items-center gap-[7px] md:mt-[-5px] md:mb-[10px]">
        <div className="text-[16px] md:text-[20px]">{name}</div>
        <BookmarkButton
          type={type}
          id={id}
          className="mt-[-2px] size-[12px] cursor-pointer text-[var(--point-color-1)] md:size-[18px]"
        />
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
