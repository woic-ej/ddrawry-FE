import PaintIcon from "@components/iconComponents/PaintIcon";
import React from "react";

interface SmallButtonProps {
  title: "수정하기" | "일기 초기화" | "지우기" | "그림 지우기" | "그림 그려줘!";
  color: "green" | "gray";
  onClick?: () => void;
}

const SmallButton: React.FC<SmallButtonProps> = ({ title, color, onClick }) => {
  const buttonClasses = () => {
    switch (color) {
      case "green":
        return "border-LimeStroke bg-Lime text-Charcoal";
      case "gray":
        return "bg-ButtonDisabled border-ButtonDisabledStroke text-[#FFFFFF]";
      default:
        return "";
    }
  };
  return (
    <button
      className={`flex justify-center items-center w-[234px] h-[82px] rounded-[15px] gap-[10px] border font-[400] text-[28px] leading-[38.08px] ${buttonClasses()}`}
      onClick={onClick}
    >
      {title === "그림 그려줘!" && (
        <PaintIcon size={36} color={color === "gray" ? "white" : "green"} />
      )}
      {title}
    </button>
  );
};

export default SmallButton;
