import DetailsItem from './DetailsItem';

export default function StoreDetails({
  firstMenu,
  firstPrice,
  secondMenu,
  secondPrice,
  thirdMenu,
  thirdPrice,
}: {
  firstMenu?: string;
  firstPrice?: string;
  secondMenu?: string;
  secondPrice?: string;
  thirdMenu?: string;
  thirdPrice?: string;
}) {
  return (
    <div className="flex flex-col gap-[16px] md:gap-[17px]">
      <div className="text-[16px] text-[var(--gray-color-2)] md:text-[20px]">
        메뉴
      </div>
      {firstMenu && firstPrice && (
        <DetailsItem title={firstMenu} price={firstPrice} />
      )}
      {secondMenu && secondPrice && (
        <DetailsItem title={secondMenu} price={secondPrice} />
      )}
      {thirdMenu && thirdPrice && (
        <DetailsItem title={thirdMenu} price={thirdPrice} />
      )}
    </div>
  );
}
