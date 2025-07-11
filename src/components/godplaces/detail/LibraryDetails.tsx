import DetailsItem from './DetailsItem';

export default function LibraryDetails() {
  return (
    <div className="flex flex-col gap-[16px] md:gap-[17px]">
      <div className="text-[16px] text-[var(--gray-color-2)] md:text-[20px]">
        메뉴
      </div>
      <DetailsItem title="입장료" price="0" />
    </div>
  );
}
