import LikeIcon from "@components/iconComponents/LikeIcon";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import React from "react";

interface Props {
  imageUrl: string;
}

const DiaryItem: React.FC<Props> = ({ imageUrl }) => {
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
          <div className="text-[28px] text-Charcoal">신나는 산책을 했따</div>
          <div className="text-[18px] text-Gray">2024년 9월 28일</div>
        </div>
      </div>
      <LikeIcon />
    </div>
  );
};

export default DiaryItem;
