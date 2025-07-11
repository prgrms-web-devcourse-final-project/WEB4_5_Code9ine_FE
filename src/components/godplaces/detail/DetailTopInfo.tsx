import { BsStar } from 'react-icons/bs';
import DetailButtonDiv from './DetailButtonDiv';

export default function DetailTopInfo({
  type,
  name,
  address,
  contact,
  url,
}: {
  type: string;
  name: string;
  address: string;
  contact?: string;
  url?: string;
}) {
  return (
    <div className="flex flex-col gap-[11px] md:gap-[15px]">
      <div>
        <div className="text-[16px] text-[var(--main-color-3)] md:text-[20px]">
          {type}
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="text-[18px] font-bold md:text-[24px]">{name}</div>
          <BsStar className="mt-[-1px] size-[16px] text-[var(--point-color-1)] md:size-[20px]" />
          {/* <BsStarFill className="mt-[-1px] size-[16px] md:size-[20px] text-[var(--point-color-1)]" /> */}
        </div>
      </div>
      <div className="text-[14px] md:text-[16px]">{address}</div>
      <DetailButtonDiv contact={contact} url={url} />
    </div>
  );
}
