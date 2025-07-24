import DetailButtonDiv from './DetailButtonDiv';
import BookmarkButton from '../common/BookmarkButton';

export default function DetailTopInfo({
  type,
  name,
  address,
  contact,
  url,
  id,
}: {
  type: string;
  name: string;
  address: string;
  contact?: string;
  url?: string;
  id: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-[11px] md:gap-[15px]">
      <div>
        <div className="text-[16px] text-[var(--main-color-3)] md:text-[20px]">
          {type}
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="text-[18px] font-bold md:text-[24px]">{name}</div>
          {id && (
            <BookmarkButton
              className="mt-[-1px] size-[16px] cursor-pointer text-[var(--point-color-1)] md:size-[20px]"
              type={type}
              id={id}
            />
          )}
        </div>
      </div>
      <div className="text-[14px] md:text-[16px]">{address}</div>
      <DetailButtonDiv contact={contact} url={url} address={address} />
    </div>
  );
}
