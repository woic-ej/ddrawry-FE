import React from "react";
import LogoTextOnly from "@assets/images/logoTextOnly.png";

interface EmptyImageProps {
  message:
  | "좋아요한 일기가 없어요! 소중한 일기들을 하나씩 모아봐요"
  | "검색된 결과가 없어요!"
  | "Error - 어떤 에러가 발생했어요."
  | "생성된 그림이 없어요!" | string;
}

const EmptyImage: React.FC<EmptyImageProps> = ({ message }) => {
  return (
    <div className="relative flex flex-col h-[100%] justify-center items-center gap-[30px]">
      <img src={LogoTextOnly} width={275} height={76} alt="LogoText" />
      <div className="hugeCaption-font leading-[48.96px]">{message}</div>
    </div>
  );
};

export default EmptyImage;
