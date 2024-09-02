import ModalButton from "@components/buttons/ModalButton";
import React from "react";

interface defaultModalProps {
  title: string;
  leftText: "네" | "이미지로" | "넹" | string;
  rightText: "아니요" | "링크로" | "아니용" | string;
  leftClick: () => void;
  rightClick: () => void;
}

const DefaultModal: React.FC<defaultModalProps> = ({
  title,
  leftText,
  rightText,
  leftClick,
  rightClick,
}) => {
  return (
    <div
      className="flex flex-col relative bg-white w-[683px] h-[269px] rounded-[30px] py-[80px] gap-[50px] px-[80px] border justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-[400] leading-[38.08px] text-center body-font whitespace-pre-line">{title}</div>
      <div className="flex gap-[30px]">
        <ModalButton title={leftText} onClick={leftClick} />
        <ModalButton title={rightText} onClick={rightClick} />
      </div>
    </div>
  );
};

export default DefaultModal;
