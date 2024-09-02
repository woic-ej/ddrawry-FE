import React from "react";
import DefaultLogo from "@assets/images/calenderItem-logo.png";
import Like from "@pages/MainPage/components/icons/Like";
import classNames from "classnames";

interface Props {
  day: string;
  isValidate: boolean;
  hasContent: boolean;
  imageUrl?: string;
  bookmark?: number;
}

const CalenderItem: React.FC<Props> = ({ day, isValidate, hasContent, imageUrl, bookmark }) => {
  const renderImage = () => {
    if (!hasContent) return null;

    return (
      <>
        <img
          src={imageUrl || DefaultLogo}
          className={`${imageUrl && "calender-item object-cover"} `}
          alt={imageUrl ? "그림일기 이미지" : "기본 로고 이미지"}
        />
        {bookmark === 1 && (
          <div className="absolute">
            <Like />
          </div>
        )}
      </>
    );
  };

  const containerClassNames = classNames(
    "calender-item relative flex justify-center items-center",
    {
      "text-ButtonDisabledStroke text-regular": !isValidate,
      "bg-white body-font": isValidate,
    },
  );

  return (
    <div className={containerClassNames}>
      {renderImage()}
      <span className="absolute">{day}</span>
    </div>
  );
};

export default CalenderItem;
