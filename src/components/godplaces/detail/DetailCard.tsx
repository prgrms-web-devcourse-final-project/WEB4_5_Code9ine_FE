import { GodplacesDetail } from '@/types/godplaces';
import DetailTopInfo from './DetailTopInfo';
import FestivalDetails from './FestivalDetails';
import LibraryDetails from './LibraryDetails';
import StoreDetails from './StoreDetails';

export default function DetailCard({
  type,
  ...props
}: {
  type: string;
} & GodplacesDetail) {
  return (
    <div className="hide-scrollbar flex min-h-[180px] flex-1 flex-col gap-[16px] overflow-y-scroll px-[18px] md:h-[745px] md:gap-[20px] md:px-[32px]">
      <DetailTopInfo
        type={type}
        name={props.name}
        address={props.address}
        contact={props.contact}
        url={props.url}
      />
      <hr className="w-[294px] border-[var(--gray-color-1)] md:w-[286px]" />
      {type === '도서관' && <LibraryDetails />}
      {type === '축제' && (
        <FestivalDetails
          startAt={props.startAt}
          endAt={props.endAt}
          category={props.category}
          target={props.target}
        />
      )}
      {type !== '도서관' && type !== '축제' && (
        <StoreDetails
          firstMenu={props.firstmenu}
          firstPrice={props.firstprice}
          secondMenu={props.secondmenu}
          secondPrice={props.secondprice}
          thirdMenu={props.thirdmenu}
          thirdPrice={props.thirdprice}
        />
      )}
    </div>
  );
}
