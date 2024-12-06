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
      setActiveButtonTitle(isCalenderView ? "캘린더형" : "목록형");
      setIsLeftActive(isCalenderView);
    } else {
      setActiveButtonTitle(isTotalView ? "전체보기" : "날짜별");
      setIsLeftActive(isTotalView);
    }
  }, [leftTitle, isTotalView, isCalenderView]);

  const handleToggle = () => {
    if (activeButtonTitle === leftTitle) {
      if (leftTitle === "캘린더형") {
        setIsCalenderView(false);
        setActiveButtonTitle("목록형");
      } else {
        setIsTotalView(false);
        setActiveButtonTitle("날짜별");
      }
      setIsLeftActive(false);
    } else {
      if (rightTitle === "날짜별") {
        setIsTotalView(true);
        setActiveButtonTitle("전체보기");
      } else {
        setIsCalenderView(true);
        setActiveButtonTitle("캘린더형");
      }
      setIsLeftActive(true);
    }
  };

  return (
    <div className="flex rounded-[10px] border border-ButtonDisabledStroke w-[190px] h-[45px] text-regular leading-[38.08px]">
      <button
        onClick={() => {
          if (!isLeftActive) {
            handleToggle();
          }
        }}
        className={`w-1/2 h-full rounded-[10px] ${
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
        className={`w-1/2 h-full rounded-[10px] ${
          isLeftActive ? "bg-white text-Charcoal" : "bg-PrimaryStroke text-white"
        }`}
      >
        {rightTitle}
      </button>
    </div>
  );
};

export default ToggleButton;
