import { IoIosArrowRoundBack } from 'react-icons/io';
import DetailCard from './DetailCard';

const TYPE = '한식';

export default function DetailBox() {
  const dummyData = {
    status: 'success',
    data: [
      {
        libraryId: '1',
        name: '서울도서관',
        address: '도서관 주소',
        url: '도서관 URL',
        latitude: '13.~',
        longitude: '13.~',
      },
    ],
  };
  return (
    <div className="mt-[20px]">
      <div className="mb-[10px] h-[30px] w-[30px]">
        <IoIosArrowRoundBack className="ml-[12px] text-[25px] text-[var(--text-color-white)]" />
      </div>
      <div className="mb-[23px] pl-[12px] text-[20px] text-[var(--gray-color-2)]">
        상세 정보
      </div>
      <DetailCard type={TYPE} {...dummyData.data[0]} />
    </div>
  );
}
