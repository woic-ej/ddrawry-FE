import React, { useState } from "react";

interface ToggleButtonProps {
  leftTitle: "캘린더형" | "전체보기";
  rightTitle: "목록형" | "날짜별";
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ leftTitle, rightTitle }) => {
  const [activeButtonTitle, setActiveButtonTitle] = useState<string>(leftTitle);
  const [isLeftActive, setIsLeftActive] = useState<boolean>(true);

  const handleToggle = () => {
    if (activeButtonTitle === leftTitle) {
      if (leftTitle === "캘린더형") {
        setActiveButtonTitle("목록형");
      } else {
        setActiveButtonTitle("날짜별");
      }
      setIsLeftActive(false);
    } else {
      if (rightTitle === "날짜별") {
        setActiveButtonTitle("전체보기");
      } else {
        setActiveButtonTitle("캘린더형");
      }
      setIsLeftActive(true);
    }
  };

  return (
    <div className="flex rounded-[10px] border border-ButtonDisabledStroke w-[270px] h-[60px] text-regular leading-[38.08px]">
      <button
        onClick={() => {
          !isLeftActive && handleToggle();
        }}
        className={`w-[134px] h-[58px] rounded-[10px] ${
          isLeftActive ? "bg-PrimaryStroke text-white" : "bg-white text-Charcoal"
        }`}
      >
        {leftTitle}
      </button>
      <button
        onClick={() => {
          isLeftActive && handleToggle();
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
