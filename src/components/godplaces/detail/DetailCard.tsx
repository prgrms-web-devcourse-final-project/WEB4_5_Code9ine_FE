import DetailTopInfo from './DetailTopInfo';
import FestivalDetails from './FestivalDetails';
import LibraryDetails from './LibraryDetails';
import StoreDetails from './StoreDetails';

type DetailType = {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  url?: string;
  category?: string;
  contact?: string;
  firstmenu?: string;
  firstprice?: string;
  secondmenu?: string;
  secondprice?: string;
  thirdmenu?: string;
  thirdprice?: string;
  target?: string;
  startAt?: string;
  endAt?: string;
  libraryId?: string;
  fetivalId?: string;
  storeId?: string;
};

export default function DetailCard({
  type,
  ...props
}: {
  type: string;
} & DetailType) {
  return (
    <div className="flex flex-col gap-[20px] px-[32px]">
      <DetailTopInfo
        type={type}
        name={props.name}
        address={props.address}
        contact={props.contact}
        url={props.url}
      />
      <hr className="w-[286px] border-[var(--gray-color-1)]" />
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
