import DetailsItem from './DetailsItem';

export default function LibraryDetails() {
  return (
    <div className="flex flex-col gap-[17px]">
      <div className="text-[20px] text-[var(--gray-color-2)]">메뉴</div>
      <DetailsItem title="입장료" price="0" />
    </div>
  );
}
