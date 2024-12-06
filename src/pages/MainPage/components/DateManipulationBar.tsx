import React from "react";
import LeftArrowIcon from "@pages/MainPage/components/icons/LeftArrowIcon";
import RightArrowIcon from "@pages/MainPage/components/icons/RightArrowIcon";
import { format } from "date-fns";
import { useDateStore } from "@store/useDateStore";

interface Props {
  date: Date;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
}
const DateManipulationBar: React.FC<Props> = ({ date, prevMonthHandler, nextMonthHandler }) => {
  const { clearCurrentDate } = useDateStore();
  return (
    <div className="w-full h-[50px] bg-white flex justify-between">
      <LeftArrowIcon onClick={prevMonthHandler} />
      <button onClick={clearCurrentDate} className="title-font">
        {format(date, "yyyy년 M월")}
      </button>
      <RightArrowIcon onClick={nextMonthHandler} />
    </div>
  );
};

export default DateManipulationBar;
