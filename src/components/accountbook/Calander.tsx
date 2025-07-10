'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/CustomCalender.css';
import { format } from 'date-fns';

export default function Calander({
  onDataChange,
}: {
  onDataChange: (arg0: boolean) => void;
}) {
  const handleStatus = () => {
    const status = true;
    onDataChange(status);
  };
  return (
    <>
      <div className="relative h-[765px] w-[755px] rounded-[10px] bg-[var(--white-color)] shadow-md">
        <div className="absolute top-[36px] left-[565px] flex gap-[10px]">
          <button className="h-[30px] w-[120px] items-center justify-center rounded-[5px] bg-[var(--main-color-1)] text-[14px] text-[#000000] hover:bg-[var(--main-color-2)] focus:bg-[var(--main-color-2)]">
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
          />
        </div>
      </div>
    </>
  );
}
