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
      <DetailsItem title={'메뉴1'} price={'3000'} />
      <DetailsItem title={'메뉴2'} price={'12000'} />
      <DetailsItem title={'메뉴3'} price={'1000'} />
    </div>
  );
}
