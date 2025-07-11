'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/CustomCalender.css';
import { format } from 'date-fns';
import { useDummyData } from '@/stores/dummyStore';

export default function Calander({
  onDataChange,
}: {
  onDataChange: (arg0: boolean) => void;
}) {
  const { dummyCalendar } = useDummyData();

  const addContent = ({ date, view }: { date: Date; view: string }) => {
    // view가 'month'일 때만 실행
    if (view === 'month') {
      // 1. 현재 날짜(date)를 "YYYY-MM-DD" 형식의 문자열로 변환
      const formattedCurrentDate = format(date, 'yyyy-MM-dd');

      // 2. dummyData에서 현재 날짜와 일치하는 모든 데이터를 'filter'로 찾음
      const dayData = dummyCalendar.days.filter(
        (item) => item.date === formattedCurrentDate,
      );

      // 3. 찾은 데이터가 있으면 'map'으로 JSX 요소를 만들어 반환
      if (dayData.length > 0) {
        return (
          <div>
            {dayData.map((item, index) => (
              <div key={index}>
                <p
                  key={index}
                  className="mx-[10px] w-[50px] justify-end text-end text-[14px] text-[var(--point-color-1)]"
                >
                  {item.expense}
                </p>
                <p
                  key={index}
                  className="mx-[10px] w-[50px] justify-end text-end text-[14px] text-[var(--main-color-1)]"
                >
                  +{item.income}
                </p>
                <p className="text-end text-[14px]">{item.difference}</p>
              </div>
            ))}
          </div>
        );
      }
    }

    // 일치하는 데이터가 없으면 null 반환
    return null;
  };

  const handleStatus = () => {
    const status = true;
    onDataChange(status);
  };


  return (
    <>
      <div className="relative h-[765px] w-[755px] rounded-[10px] bg-[var(--white-color)] shadow-md">
        <div className="absolute top-[36px] left-[565px] flex gap-[10px]">
          <button className="h-[30px] w-[120px] items-center justify-center rounded-[5px] bg-[var(--main-color-1)] text-[14px] text-[#000000] hover:bg-[var(--main-color-2)] active:bg-[var(--main-color-2)]">
            오늘 지출이 없어요!
          </button>
          <button
            className="size-[30px] rounded-[5px] bg-[var(--main-color-1)] text-[#000000] hover:bg-[var(--main-color-2)] active:bg-[var(--main-color-2)]"
            onClick={handleStatus}
          >
            +
          </button>
        </div>
        <div>
          <Calendar
            calendarType="gregory"
            formatDay={(locale, date) => format(date, 'd')}
            tileContent={addContent}
            navigationLabel={({ date }) => (
              <div className="custom-navigation-label">
                <span className="year-display">{date.getFullYear()}년</span>
                <span className="month-display">{date.getMonth() + 1}월</span>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}
