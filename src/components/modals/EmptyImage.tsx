import React from "react";
import LogoTextOnly from "@assets/images/logoTextOnly.png";

const EmptyImage: React.FC = () => {
  return (
    <div className="relative flex flex-col h-[100%] justify-center items-center gap-[30px]">
      <img src={LogoTextOnly} width={275} height={76} alt="LogoText" />
      <div className="font-[400] text-[36px] text-Gray leading-[48.96px]">
        생성된 그림이 없어요!
      </div>
    </div>
  );
};

export default EmptyImage;
