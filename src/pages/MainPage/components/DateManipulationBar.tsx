import React from "react";
import LeftArrowIcon from "@pages/MainPage/components/icons/LeftArrowIcon";
import RightArrowIcon from "@pages/MainPage/components/icons/RightArrowIcon";
import { getMonth } from "@utils/getDate";

interface Props {
  date: Date;
}
const DateManipulationBar: React.FC<Props> = ({ date }) => {
  return (
    <div className="w-[990px] h-[50px] bg-white flex justify-between">
      <LeftArrowIcon />
      <div className="title-font">{getMonth(date)}</div>
      <RightArrowIcon />
    </div>
  );
};

export default DateManipulationBar;
