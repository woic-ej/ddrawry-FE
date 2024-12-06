import ModalButton from "@components/buttons/ModalButton";
import React from "react";

interface DefaultModalProps {
  title: string;
  leftText: "네" | "이미지로" | "넹" | string;
  rightText: "아니요" | "링크로" | "아니용" | string;
  leftClick: () => void;
  rightClick: () => void;
}

const DefaultModal: React.FC<DefaultModalProps> = ({
  title,
  leftText,
  rightText,
  leftClick,
  rightClick,
}) => {
  return (
    <div
      className="flex flex-col relative bg-white w-[450px] h-[200px] rounded-[30px] gap-[20px] border justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="leading-[38.08px] text-center body-font whitespace-pre-line">{title}</div>
      <div className="flex gap-[30px]">
        <ModalButton title={leftText} onClick={leftClick} />
        <ModalButton title={rightText} onClick={rightClick} />
      </div>
    </div>
  );
};

export default DefaultModal;
