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
    <div className="h-[91px] w-[290px] cursor-pointer rounded-[10px] bg-[--white-color] px-[14px] py-[12px] shadow-[var(--shadow-md)] hover:scale-101 md:h-[100px] md:w-[310px]">
      <div className="flex justify-between">
        <div className="text-[12px] text-[var(--main-color-3)] md:text-[14px]">
          {type}
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
      <div className="flex gap-[6px] text-[12px] md:text-[14px]">
        <div>입장료</div>
        <div>0원</div>
      </div>
    </div>
  );
}
