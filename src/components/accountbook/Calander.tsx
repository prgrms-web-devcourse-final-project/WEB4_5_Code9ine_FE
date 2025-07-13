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
    if (view === 'month') {
      const formattedCurrentDate = format(date, 'yyyy-MM-dd');

      const dayData = dummyCalendar.days.filter(
        (item) => item.date === formattedCurrentDate,
      );

      if (dayData.length > 0) {
        return (
          <div className="w-full">
            {dayData.map((item, index) => (
              <div key={index}>
                <p
                  key={Math.random().toString(36)}
                  className="block w-full items-end justify-end truncate text-end text-[8px] text-[var(--point-color-1)] md:text-[14px]"
                >
                  -{item.expense.toLocaleString('ko-KR')}
                </p>
                <p
                  key={Math.random().toString(36)}
                  className="justify-end text-end text-[8px] text-[var(--main-color-3)] md:text-[14px]"
                >
                  +{item.income.toLocaleString('ko-KR')}
                </p>
                <p className="justify-end text-end text-[8px] md:text-[14px]">
                  {item.difference.toLocaleString('ko-KR')}
                </p>
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const handleStatus = () => {
    const status = true;
    onDataChange(status);
  };

  return (
    <>
      <div className="relative mx-[15px] rounded-[10px] bg-[var(--white-color)] shadow-md md:mx-[0px] md:h-[765px] md:w-[755px]">
        <div className="absolute top-[25px] right-[10px] flex gap-[10px] md:top-[36px] md:left-[565px]">
          <button className="h-[20px] w-[70px] cursor-pointer items-center justify-center rounded-[5px] bg-[var(--main-color-1)] text-[8px] text-[#000000] hover:bg-[var(--main-color-2)] active:bg-[var(--main-color-2)] md:h-[30px] md:w-[120px] md:text-[14px]">
            오늘 지출이 없어요!
          </button>
          <button
            className="flex size-[20px] cursor-pointer items-center justify-center rounded-[5px] bg-[var(--main-color-1)] text-[#000000] hover:bg-[var(--main-color-2)] active:bg-[var(--main-color-2)] md:size-[30px]"
            onClick={handleStatus}
          >
            +
          </button>
        </div>
        <div className="flex h-full justify-center">
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
