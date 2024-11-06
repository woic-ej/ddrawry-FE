import { useToggleStore } from "@store/useToggleStore";
import React, { useEffect, useState } from "react";

interface ToggleButtonProps {
  leftTitle: "캘린더형" | "전체보기";
  rightTitle: "목록형" | "날짜별";
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ leftTitle, rightTitle }) => {
  const [activeButtonTitle, setActiveButtonTitle] = useState<string>(leftTitle);
  const { setIsTotalView, setIsCalenderView, isTotalView, isCalenderView } = useToggleStore();
  const [isLeftActive, setIsLeftActive] = useState<boolean>(true);

  useEffect(() => {
    if (leftTitle === "캘린더형") {
      setIsLeftActive(isCalenderView);
    } else {
      setIsLeftActive(isTotalView);
    }
  }, [leftTitle, isTotalView, isCalenderView]);

  const handleToggle = () => {
    if (activeButtonTitle === leftTitle) {
      if (leftTitle === "캘린더형") {
        setActiveButtonTitle("목록형");
        setIsCalenderView(false);
      } else {
        setActiveButtonTitle("날짜별");
        setIsTotalView(false);
      }
      setIsLeftActive(false);
    } else {
      if (rightTitle === "날짜별") {
        setActiveButtonTitle("전체보기");
        setIsTotalView(true);
      } else {
        setActiveButtonTitle("캘린더형");
        setIsCalenderView(true);
      }
      setIsLeftActive(true);
    }
  };

  return (
    <div className="flex rounded-[10px] border border-ButtonDisabledStroke w-[270px] h-[60px] text-regular leading-[38.08px]">
      <button
        onClick={() => {
          if (!isLeftActive) {
            handleToggle();
          }
        }}
        className={`w-[134px] h-[58px] rounded-[10px] ${
          isLeftActive ? "bg-PrimaryStroke text-white" : "bg-white text-Charcoal"
        }`}
      >
        {leftTitle}
      </button>
      <button
        onClick={() => {
          if (isLeftActive) {
            handleToggle();
          }
        }}
        className={`w-[136px] h-[58px] rounded-[10px] ${
          isLeftActive ? "bg-white text-Charcoal" : "bg-PrimaryStroke text-white"
        }`}
      >
        {rightTitle}
      </button>
    </div>
  );
};

export default ToggleButton;
