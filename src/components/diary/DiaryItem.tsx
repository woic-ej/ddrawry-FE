import LikeIcon from "@components/iconComponents/LikeIcon";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import React from "react";
import { getDate } from "@utils/getDate";

interface Props {
  imageUrl?: string;
  title: string;
  date: Date;
  likeStatus: number;
}

const DiaryItem: React.FC<Props> = ({ imageUrl, title, date, likeStatus }) => {
  return (
    <div className="w-[950px] h-[275px] bg-white flex items-center justify-between border-b-[3px] border-buttonDisabled">
      <div className="flex items-center gap-[46px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="w-[256px] h-[230px] rounded-[10px]"
            alt="그림일기 이미지"
          />
        ) : (
          <DefaultDiaryLogo />
        )}
        <div className="flex flex-col gap-[18px]">
          <div className="body-font">{title}</div>
          <div className="smallCaption-font">{getDate(date)}</div>
        </div>
      </div>
      <LikeIcon status={likeStatus} />
    </div>
  );
};

export default DiaryItem;
