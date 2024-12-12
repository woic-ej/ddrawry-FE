import { format, getDate, getMonth, parseISO, isAfter } from "date-fns";
import React from "react";
import { BaseDiaryType } from "src/types/diaryTypes";
import CalenderItem from "@pages/MainPage/components/calender/CalenderItem";

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  currentMonthData: Date[];
  currentDate: Date;
  calenderData: BaseDiaryType[];
}

// 일기 데이터가 있는 날을 찾아내는 함수
const findEventForDate = (date: Date, events: BaseDiaryType[]) => {
  return events.find((event) => {
    const eventDate = parseISO(event.date);
    return getDate(date) === getDate(eventDate) && getMonth(date) === getMonth(eventDate);
  });
};

const renderCalenderItem = (day: Date, currentDate: Date, events: BaseDiaryType[]) => {
  const isCurrentMonth = getMonth(day) === getMonth(currentDate);
  const isFutureDate = isAfter(day, new Date()); // 오늘 이후 날짜인지 확인
  const calendarEvent = findEventForDate(day, events);
  return (
    <CalenderItem
      currentDate={day}
      day={format(day, "d")}
      isValidate={isCurrentMonth}
      isFutureDate={isFutureDate}
      hasContent={!!calendarEvent}
      imageUrl={calendarEvent?.image}
      bookmark={calendarEvent?.bookmark}
      id={calendarEvent?.id}
      key={format(day, "MMdd")}
    />
  );
};

const Calender: React.FC<Props> = ({ currentMonthData, currentDate, calenderData }) => {
  return (
    <div className="w-full h-auto border-[3px] border-ButtonDisabled rounded-[10px] flex flex-col items-center gap-[20px] md:gap-[30px] lg:gap-[50px]">
      <div className="flex w-full justify-around mt-[20px] sm:mt-[30px] lg:mt-[48px]">
        {DAY_LIST.map((day) => (
          <div
            key={`${day}key`}
            className={`${
              day === "일" ? "text-Red" : day === "토" ? "text-Primary" : "text-Charcoal"
            } title-font font-bold`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 w-full md:gap-x-[11px] md:gap-y-[11px] md:p-[11px]">
        {currentMonthData.map((day) => renderCalenderItem(day, currentDate, calenderData))}
      </div>
    </div>
  );
};

export default Calender;
