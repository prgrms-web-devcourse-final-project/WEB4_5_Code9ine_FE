import SearchListCard from './SearchListCard';

export default function SearchListBox() {
  const dummyData = {
    code: '0000',
    message: '정상적으로 완료되었습니다.',
    data: [
      {
        storeId: '1',
        name: '강남 한식당',
        address: '서울 강남구 테헤란로 10',
        category: '한식',
        type: '한식',
        contact: '02-1212-1212',
        firstmenu: '비빔밥',
        firstprice: 8000,
        latitude: 37.501,
        longitude: 127.039,
      },
      {
        storeId: '2',
        name: '강남 중식당',
        address: '서울 강남구 역삼로 20',
        category: '중식',
        type: '중식',
        contact: '02-1212-1212',
        firstmenu: '짜장면',
        firstprice: 7000,
        latitude: 37.495,
        longitude: 127.03,
      },
      {
        storeId: '3',
        name: '강남 양식당',
        address: '서울 강남구 봉은사로 30',
        category: '양식',
        type: '양식',
        contact: '02-1212-1212',
        firstmenu: '파스타',
        firstprice: 12000,
        latitude: 37.504,
        longitude: 127.037,
      },
      {
        festivalId: '4',
        name: '강남 문화축제',
        address: '서울 강남구 삼성로 40',
        url: 'htps://example.com',
        category: null,
        type: '축제',
        firstmenu: null,
        firstprice: null,
        latitude: 37.51,
        longitude: 127.056,
      },
      {
        libraryId: '5',
        name: '강남 도서관',
        address: '서울 강남구 논현로 50',
        url: 'htps://example.com',
        category: null,
        type: '도서관',
        contact: '02-1212-1212',
        firstmenu: null,
        firstprice: null,
        latitude: 37.512,
        longitude: 127.041,
      },
      {
        storeId: '2',
        name: '강남 중식당',
        address: '서울 강남구 역삼로 20',
        category: '중식',
        type: '중식',
        contact: '02-1212-1212',
        firstmenu: '짜장면',
        firstprice: 7000,
        latitude: 37.495,
        longitude: 127.03,
      },
      {
        storeId: '3',
        name: '강남 양식당',
        address: '서울 강남구 봉은사로 30',
        category: '양식',
        type: '양식',
        contact: '02-1212-1212',
        firstmenu: '파스타',
        firstprice: 12000,
        latitude: 37.504,
        longitude: 127.037,
      },
      {
        festivalId: '4',
        name: '강남 문화축제',
        address: '서울 강남구 삼성로 40',
        url: 'htps://example.com',
        category: null,
        type: '축제',
        firstmenu: null,
        firstprice: null,
        latitude: 37.51,
        longitude: 127.056,
      },
      {
        libraryId: '5',
        name: '강남 도서관',
        address: '서울 강남구 논현로 50',
        url: 'htps://example.com',
        category: null,
        type: '도서관',
        contact: '02-1212-1212',
        firstmenu: null,
        firstprice: null,
        latitude: 37.512,
        longitude: 127.041,
      },
    ],
  };
  return (
    <div className="flex flex-1 flex-col py-[13px] md:h-full md:py-[28px]">
      <div className="mb-[10px] pl-[10px] text-[16px] text-[var(--gray-color-2)] md:mb-[18px] md:pl-[12px] md:text-[20px]">
        검색 결과
      </div>
      <div className="hide-scrollbar flex flex-col items-center gap-[8px] overflow-y-auto px-[10px] pt-[4px] md:h-[782px] md:max-h-[100vh] md:gap-[13px] md:px-[0px] h-[35dvh]">
        {dummyData.data.map((d, idx) => (
          <SearchListCard key={idx} type={d.type} name={d.name} />
        ))}
      </div>
    </div>
  );
}
