import { FiPhone } from 'react-icons/fi';
import DetailButton from './DetailButton';
import { IoHomeOutline } from 'react-icons/io5';
import Image from 'next/image';
import kakaomap from '../../../assets/kakaomap_horizontal_ko.png';

export default function DetailButtonDiv({
  contact,
  url,
  address,
}: {
  contact?: string;
  url?: string;
  address: string;
}) {
  return (
    <>
      <div className="flex gap-[9px] md:gap-[10px]">
        {contact && (
          <a href={`tel:${contact}`}>
            <DetailButton color="gray">
              <FiPhone />
              <div>{contact}</div>
            </DetailButton>
          </a>
        )}
        {url && (
          <a href={url} target="_blank">
            <DetailButton color="purple">
              <IoHomeOutline />
            </DetailButton>
          </a>
        )}
        <a
          href={`https://map.kakao.com/link/search/${address}`}
          target="_blank"
        >
          <DetailButton color="skyblue">
            <Image src={kakaomap} alt={'카카오맵'} height={23} />
          </DetailButton>
        </a>
      </div>
    </>
  );
}
