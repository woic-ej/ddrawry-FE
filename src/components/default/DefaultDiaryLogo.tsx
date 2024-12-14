import React from "react";
import DefaultLogo from "@assets/images/diaryItem-logo.webp";

const DefaultDiaryLogo: React.FC = () => {
  return (
    <div className="aspect-square rounded-[10px] flex justify-center items-center">
      <img
        src={DefaultLogo}
        alt="기본 로고 이미지"
        width={180}
        height={135}
        className="w-[100px] md:w-[130px] lg:w-[150px] aspect-auto"
      />
    </div>
  );
};

export default DefaultDiaryLogo;
