import React from "react";
import DefaultLogo from "@assets/images/calenderItem-logo.png";
import Like from "@pages/MainPage/components/icons/Like";

interface Props {
  date: number;
  imageUrl?: string;
  likeStatus?: number;
}

const CalenderItem: React.FC<Props> = ({ date, imageUrl, likeStatus }) => {
  return (
    <div className="w-[145px] h-[170px] bg-white rounded-[10px] body-font flex justify-center items-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          className="w-[145px] h-[170px] rounded-[10px] object-cover"
          alt="그림일기 이미지"
        ></img>
      ) : (
        <img src={DefaultLogo} alt="기본 로고 이미지" />
      )}
      {likeStatus && (
        <div className="absolute">
          <Like />
        </div>
      )}
      <span className="absolute">{date}</span>
    </div>
  );
};

export default CalenderItem;
