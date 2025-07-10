// import { BsStar, BsStarFill } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { IoCheckmark } from 'react-icons/io5';

export default function SearchListCard({
  type,
  name,
}: {
  type: string;
  name: string;
}) {
  return (
    <div className="cursor-pointer rounded-[10px] bg-[--white-color] px-[14px] py-[10px] shadow-[var(--shadow-md)] hover:scale-101 md:h-[100px] md:w-[310px]">
      <div className="flex justify-between">
        <div className="text-[14px] text-[var(--main-color-3)]">{type}</div>
        <div className="flex items-center gap-[6px] text-[10px] text-[var(--gray-color-2)] hover:text-[var(--main-color-3)]">
          <div>장소선택</div>
          <IoCheckmark className="text-[24px]" />
        </div>
      </div>
      <div className="mt-[-5px] mb-[10px] flex items-center gap-[7px]">
        <div className="text-[20px]">{name}</div>
        <BsStar className="mt-[-2px] size-[18px] text-[var(--point-color-1)]" />
        {/* <BsStarFill className="mt-[-2px] size-[18px] text-[var(--point-color-1)]" /> */}
      </div>
      <div className="flex gap-[6px] text-[14px] font-normal">
        <div>입장료</div>
        <div>0원</div>
      </div>
    </div>
  );
}
