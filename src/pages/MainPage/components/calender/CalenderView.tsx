import React, { useEffect, useMemo, useState } from "react";
import DateManipulationBar from "@pages/MainPage/components/DateManipulationBar";
import Calender from "@pages/MainPage/components/calender/Calender";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useDateControl } from "@hooks/useDateControl";
import DiaryList from "@components/diary/list/DiaryList";
import { useToggleStore } from "@store/useToggleStore";
import { format } from "date-fns";
import EmptyState from "@components/empty/EmptyState";
import { BaseDiaryType } from "src/types/diaryTypes";
import { useGetMainDiaries } from "@api/calender/useCalender";

const CalenderView: React.FC = () => {
  const { currentDate, prevMonthHandler, nextMonthHandler } = useDateControl();
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 날짜가 포함된 주의 끝 날짜
  const { isCalenderView } = useToggleStore();
  const [currentDateParam, setCurrentDateParam] = useState<string>(format(currentDate, "yyyyMM"));
  const [previousMonthParam, setPreviousMonthParam] = useState<string>(
    format(subMonths(currentDate, 1), "yyyyMM"),
  );
  const [nextMonthParam, setNextMonthParam] = useState<string>(
    format(addMonths(currentDate, 1), "yyyyMM"),
  );

  // 해당달 캘린더 data
  const { data: getCurrentMainCalender } = useGetMainDiaries(isCalenderView, currentDateParam);

  // 다음달 캘린더 data
  const { data: getNextMainCalender } = useGetMainDiaries(isCalenderView, nextMonthParam);

  // 이전달 캘린더 data
  const { data: getPreviousMainCalender } = useGetMainDiaries(isCalenderView, previousMonthParam);

  const [getTotalCalenderData, setGetTotalCalenderData] = useState<BaseDiaryType[]>();

  useEffect(() => {
    if (getCurrentMainCalender && getNextMainCalender && getPreviousMainCalender) {
      setGetTotalCalenderData([
        ...getCurrentMainCalender.data,
        ...getNextMainCalender.data,
        ...getPreviousMainCalender.data,
      ]);
    }
    
  }, [getCurrentMainCalender, getNextMainCalender, getPreviousMainCalender, currentDateParam]);

  const currentMonth = currentDate.getMonth() + 1;

  useEffect(() => {
    setCurrentDateParam(format(currentDate, "yyyyMM"));
    setNextMonthParam(format(addMonths(currentDate, 1), "yyyyMM"));
    setPreviousMonthParam(format(subMonths(currentDate, 1), "yyyyMM"));
  }, [currentMonth]);

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
      {getTotalCalenderData && getCurrentMainCalender && 
        (isCalenderView === true ? (
          <Calender
            currentMonthData={currentMonthData}
            currentDate={currentDate}
            calenderData={getTotalCalenderData}
          />
        ) : getCurrentMainCalender.data.length === 0 ? (
          <div className={"h-full w-full flex flex-grow justify-center items-center"}>
            <EmptyState message="작성된 일기가 없어요!" />
          </div>
        ) : (
          <DiaryList diaries={getCurrentMainCalender.data} />
        ))}
    </div>
  );
};

export default CalenderView;
