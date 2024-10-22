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
import { BaseDiaryType } from "src/types/diaryTypes";
import DiaryList from "@components/diary/list/DiaryList";
import { useToggleStore } from "@store/useToggleStore";

const DUMMY_DATA = [
  {
    id: 1,
    date: "2024-08-13",
    image:
      "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004",
    bookmark: false,
  },
  {
    id: 2,
    date: "2024-08-19",
    image: "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    bookmark: false,
  },
  {
    id: 3,
    date: "2024-08-25",
    image: "",
    bookmark: true,
  },
  {
    id: 4,
    date: "2024-08-31",
    image: "",
    bookmark: false,
  },
];

const CalenderView: React.FC = () => {
  const [calenderData, setCalenderData] = useState<BaseDiaryType[]>();
  const { currentDate, prevMonthHandler, nextMonthHandler } = useDateControl();
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 날짜가 포함된 주의 끝 날짜
  const { isCalenderView } = useToggleStore();

  const currentMonthData = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate]);

  useEffect(() => {
    // api호출로 일기 데이터 받아옴
    setCalenderData(DUMMY_DATA);
  }, [currentDate]);

  return (
    <div className="w-full min-w-[990px] flex flex-col items-center gap-[64px]">
      <DateManipulationBar
        date={currentDate}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
      />
      {calenderData &&
        (isCalenderView === true ? (
          <Calender
            currentMonthData={currentMonthData}
            currentDate={currentDate}
            calenderData={calenderData}
          />
        ) : (
          <DiaryList diaries={[]} />
        ))}
    </div>
  );
};

export default CalenderView;
