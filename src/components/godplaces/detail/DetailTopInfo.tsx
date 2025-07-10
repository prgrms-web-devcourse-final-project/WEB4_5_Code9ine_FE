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
    <div className="flex flex-col gap-[15px]">
      <div>
        <div className="text-[20px] text-[var(--main-color-3)]">{type}</div>
        <div className="flex items-center gap-[10px]">
          <div className="text-[24px] font-bold">{name}</div>
          <BsStar className="mt-[-2px] size-[20px] text-[var(--point-color-1)]" />
          {/* <BsStarFill className="mt-[-2px] size-[20px] text-[var(--point-color-1)]" /> */}
        </div>
      </div>
      <div className="text-[16px]">{address}</div>
      <DetailButtonDiv contact={contact} url={url} />
    </div>
  );
}
