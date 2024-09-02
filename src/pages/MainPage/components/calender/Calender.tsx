import { format, getDate, getMonth, parseISO } from "date-fns";
import React from "react";
import { CalenderDataType } from "src/types/diaryTypes";
import CalenderItem from "@pages/MainPage/components/calender/CalenderItem";

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];

interface Props {
  currentMonthData: Date[];
  currentDate: Date;
  calenderData: CalenderDataType[];
}

// 일기 데이터가 있는 날을 찾아내는 함수
const findEventForDate = (date: Date, events: CalenderDataType[]) => {
  return events.find((event) => {
    const eventDate = parseISO(event.date);
    return getDate(date) === getDate(eventDate);
  });
};

const renderCalenderItem = (day: Date, currentDate: Date, events: CalenderDataType[]) => {
  const isCurrentMonth = getMonth(day) === getMonth(currentDate);
  const formattedDay = format(day, "d");
  const calendarEvent = findEventForDate(day, events);
  return (
    <CalenderItem
      day={formattedDay}
      isValidate={isCurrentMonth}
      hasContent={!!calendarEvent}
      imageUrl={calendarEvent?.image}
      bookmark={calendarEvent?.bookmark}
    />
  );
};

const Calender: React.FC<Props> = ({ currentMonthData, currentDate, calenderData }) => {
  return (
    <div className="w-[1150px] min-h-[1067px] border-[3px] border-ButtonDisabled rounded-[10px] flex flex-col items-center gap-[54px]">
      <div className="flex w-full justify-around mt-[48px]">
        {DAY_LIST.map((day) => (
          <div
            key={`${day}key`}
            className={`${
              day === "일" ? "text-Red" : day === "토" ? "text-Primary" : "text-Charcoal"
            } text-huge font-bold`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-[12px] gap-y-[11px]">
        {currentMonthData.map((day) => renderCalenderItem(day, currentDate, calenderData))}
      </div>
    </div>
  );
};

export default Calender;
