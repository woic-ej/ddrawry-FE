import ToggleButton from "@components/buttons/ToggleButton";
import DiaryList from "@components/diary/list/DiaryList";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import { useDateControl } from "@hooks/useDateControl";
import DateManipulationBar from "@pages/MainPage/components/DateManipulationBar";
import { useToggleStore } from "@store/useToggleStore";
import React from "react";

const LikedPage: React.FC = () => {
  const { currentDate, prevMonthHandler, nextMonthHandler } = useDateControl();
  const { isTotalView } = useToggleStore();

  console.log(isTotalView);

  return (
    <div className="flex flex-col h-screen w-full">
      <HeaderWithProfile title="좋아요한 일기들" />
      <div className="flex flex-grow items-center flex-col gap-[48px] px-[130px] py-[53px]">
        <div className="flex justify-start w-full min-w-[990px]">
          <ToggleButton leftTitle="전체보기" rightTitle="날짜별" />
        </div>
        <div className="w-full min-w-[990px] flex flex-col items-center gap-[64px]">
          {!isTotalView && (
            <DateManipulationBar
              date={currentDate}
              prevMonthHandler={prevMonthHandler}
              nextMonthHandler={nextMonthHandler}
            />
          )}
          <DiaryList />
        </div>
      </div>
    </div>
  );
};

export default LikedPage;
