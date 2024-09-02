import React from "react";
import DefaultLogo from "@assets/images/calenderItem-logo.png";
import Like from "@pages/MainPage/components/icons/Like";

interface Props {
  day: string;
  isValidate: boolean;
  hasContent: boolean;
  imageUrl?: string;
  bookmark?: number;
}

const CalenderItem: React.FC<Props> = ({ day, isValidate, hasContent, imageUrl, bookmark }) => {
  if (isValidate && hasContent) {
    return (
      <div className="calender-item  bg-white body-font flex justify-center items-center">
        {imageUrl ? (
          <img src={imageUrl} className="calender-item object-cover" alt="그림일기 이미지"></img>
        ) : (
          <img src={DefaultLogo} alt="기본 로고 이미지" />
        )}
        {bookmark === 1 && (
          <div className="absolute">
            <Like />
          </div>
        )}
        <span className="absolute">{day}</span>
      </div>
    );
  }
  return (
    <div className="calender-item  bg-white body-font flex justify-center items-center">
      <span className="absolute">{isValidate && day}</span>
    </div>
  );
};

export default CalenderItem;
