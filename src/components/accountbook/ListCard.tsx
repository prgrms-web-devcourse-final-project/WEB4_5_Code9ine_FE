import { PayList } from '@/types/payData';
import CardMenu from './CardMenu';

export default function ListCard({
  value,
  index,
}: {
  value: PayList;
  index: number;
}) {
  return (
    <>
      <div className="group relative flex min-h-[95px] w-[315px] items-center justify-center gap-[10px] rounded-[10px] bg-[var(--white-color)] px-[10px] py-[22px] shadow-md hover:z-999">
        <div className="absolute left-[10px] flex gap-[10px]">
          <div className="flex size-[50px] items-center justify-center rounded-full bg-[var(--main-color-1)]">
            <span className="text-[25px]">{value.categoryIcon}</span>
          </div>
          <div>
            <p className="text-[var(--main-color-3)]">{value.category}</p>
            <p>{value.content}</p>
          </div>
        </div>
        {value.type === 'expense' ? (
          <div className="absolute right-[20px]">
            <span className="ml-[26px] text-[var(--point-color-1)]">
              -{value.price.toLocaleString('ko-KR')}원
            </span>
          </div>
        ) : (
          <div className="absolute right-[20px]">
            <span className="ml-[26px] text-[var(--main-color-1)]">
              {value.price.toLocaleString('ko-KR')}원
            </span>
          </div>
        )}
        <div className="absolute top-[80px] right-[13px] hidden group-hover:flex">
          <CardMenu index={index} />
        </div>
      </div>
    </>
  );
}
