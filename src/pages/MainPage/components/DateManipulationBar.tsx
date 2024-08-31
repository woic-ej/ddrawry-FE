import React from "react";
import LeftArrowIcon from "@pages/MainPage/components/icons/LeftArrowIcon";
import RightArrowIcon from "@pages/MainPage/components/icons/RightArrowIcon";
import { format } from "date-fns";

interface Props {
  date: Date;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
}
const DateManipulationBar: React.FC<Props> = ({ date, prevMonthHandler, nextMonthHandler }) => {
  return (
    <div className="w-[990px] h-[50px] bg-white flex justify-between">
      <LeftArrowIcon onClick={prevMonthHandler} />
      <div className="title-font">{format(date, "yyyy년 M월")}</div>
      <RightArrowIcon onClick={nextMonthHandler} />
    </div>
  );
};

export default DateManipulationBar;
