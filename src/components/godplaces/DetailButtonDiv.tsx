import { FiPhone } from 'react-icons/fi';
import DetailButton from './DetailButton';
import { IoHomeOutline } from 'react-icons/io5';
import Image from 'next/image';
import kakaomap from '../../assets/kakaomap_horizontal_ko.png';

export default function DetailButtonDiv({
  contact,
  url,
}: {
  contact?: string;
  url?: string;
}) {
  return (
    <>
      <div className="flex gap-[10px]">
        {contact && (
          <DetailButton color="gray">
            <FiPhone />
            <div>02-xxxx-xxxx</div>
          </DetailButton>
        )}
        {url && (
          <DetailButton color="purple">
            <IoHomeOutline />
          </DetailButton>
        )}
        <DetailButton color="skyblue">
          <Image src={kakaomap} alt={'카카오맵'} height={23} />
        </DetailButton>
      </div>
    </>
  );
}
