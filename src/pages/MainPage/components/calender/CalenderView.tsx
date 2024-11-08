import React, { useEffect, useMemo, useState } from "react";
import DateManipulationBar from "@pages/MainPage/components/DateManipulationBar";
import Calender from "@pages/MainPage/components/calender/Calender";
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useDateControl } from "@hooks/useDateControl";
import DiaryList from "@components/diary/list/DiaryList";
import { useToggleStore } from "@store/useToggleStore";
import { format } from "date-fns";
import { useGetMainDiaries } from "@api/calender/useCalender";
import EmptyState from "@components/empty/EmptyState";

const CalenderView: React.FC = () => {
  const { currentDate, prevMonthHandler, nextMonthHandler } = useDateControl();
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 날짜가 포함된 주의 끝 날짜
  const { isCalenderView } = useToggleStore();
  const [dateParam, setDateParam] = useState<string>(format(currentDate, "yyyyMM"));
  const { data: getMainCalender } = useGetMainDiaries(isCalenderView, dateParam);
  const currentMonth = currentDate.getMonth() + 1
  console.log(getMainCalender)
  
  useEffect(() => {
    setDateParam(format(currentDate, "yyyyMM"));
  }, [currentMonth])

  const currentMonthData = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate]);

  return (
    <div className="w-full min-w-[990px] flex flex-col items-center gap-[64px] flex-grow">
      <DateManipulationBar
        date={currentDate}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
      />
      {getMainCalender &&
        (isCalenderView === true ? (
          <Calender
            currentMonthData={currentMonthData}
            currentDate={currentDate}
            calenderData={getMainCalender.data}
          />
        ) : getMainCalender.data.length === 0 ? (
          <div className={"h-full w-full flex flex-grow justify-center items-center"}>
            <EmptyState message="작성된 일기가 없어요!" />
          </div>
        ) : (
          <DiaryList diaries={getMainCalender.data} />
        ))}
    </div>
  );
};

export default CalenderView;
