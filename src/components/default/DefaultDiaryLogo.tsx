import React from "react";
import DefaultLogo from "@assets/images/diaryItem-logo.webp";

const DefaultDiaryLogo: React.FC = () => {
  return (
    <div className="w-[180px] aspect-square rounded-[10px] flex justify-center items-center">
      <img
        src={DefaultLogo}
        alt="기본 로고 이미지"
        width={180}
        height={135}
        className="w-full aspect-auto"
      />
    </div>
  );
};

export default DefaultDiaryLogo;
