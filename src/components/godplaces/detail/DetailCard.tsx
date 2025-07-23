import { GodplacesDetail } from '@/types/godplaces';
import DetailTopInfo from './DetailTopInfo';
import FestivalDetails from './FestivalDetails';
import LibraryDetails from './LibraryDetails';
import StoreDetails from './StoreDetails';
import { getLabel } from '@/lib/helper/getLabel';

export default function DetailCard({ ...props }: GodplacesDetail) {
  const label = getLabel(props.type, props.category);

  return (
    <div className="hide-scrollbar flex min-h-[180px] flex-col gap-[16px] overflow-y-scroll px-[18px] md:h-auto md:gap-[20px] md:px-[25px]">
      <DetailTopInfo
        type={label}
        name={props.name}
        address={props.address}
        contact={props.contact}
        url={props.url}
        id={props.storeId || props.libraryId || props.festivalId}
      />
      <hr className="w-full border-[var(--gray-color-1)]" />
      {props.type === 'library' && <LibraryDetails />}
      {props.type === 'festival' && (
        <FestivalDetails
          startAt={props.startAt}
          endAt={props.endAt}
          category={props.category}
          target={props.target}
        />
      )}
      {props.type !== 'library' && props.type !== 'festival' && (
        <StoreDetails
          firstMenu={props.firstMenu}
          firstPrice={props.firstPrice}
          secondMenu={props.secondMenu}
          secondPrice={props.secondPrice}
          thirdMenu={props.thirdMenu}
          thirdPrice={props.thirdPrice}
        />
      )}
    </div>
  );
}
