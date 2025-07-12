'use client';
import { IoIosArrowRoundBack } from 'react-icons/io';
import DetailCard from './DetailCard';
import { useRouter } from 'next/navigation';

const TYPE = '한식';

export default function DetailBox() {
  const router = useRouter();

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
        contact: '02-xxxx-xxxx',
      },
    ],
  };

  const backHandler = () => {
    router.back();
  };

  return (
    <div className="mt-[7px] pb-[20px] md:mt-[20px]">
      <div
        className="h-[22px] w-[22px] cursor-pointer md:mb-[10px] md:w-[30px]"
        onClick={backHandler}
      >
        <IoIosArrowRoundBack className="ml-[8px] text-[20px] text-[var(--text-color-white)] md:ml-[12px] md:text-[25px]" />
      </div>
      <div className="mb-[11px] pl-[9px] text-[16px] text-[var(--gray-color-2)] md:mb-[23px] md:pl-[12px] md:text-[20px]">
        상세 정보
      </div>
      <DetailCard type={TYPE} {...dummyData.data[0]} />
    </div>
  );
}
