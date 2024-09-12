import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import Diary from "@components/diary/Diary";
import DefaultHeader from "@components/header/DefaultHeader";
import useDiaryStore from "@store/diaryStore";
import useImageStore from "@store/imageStore";
import React from "react";

const WriteDiaryPage: React.FC = () => {
  const { content, clearContent, limitLength, clearAll } = useDiaryStore();
  const { image, clearImage } = useImageStore();
  const isValid = content.length >= limitLength;

  const handleResetClick = () => {
    clearContent();
  };

  const handleDeleteClick = () => {
    clearImage();
  };

  const handleSaveClick = () => {
    if (isValid) {
      console.log("저장됨"); // api 호출로 후에 처리
      clearImage();
      clearAll();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <DefaultHeader title="일기 쓰기" />
      <Diary date="2024년 8월 10일" name="최은진" count={3} isFull={false} />
      <div className="flex w-[1150px] justify-between mb-[80px]">
        <div className="flex gap-[38px]">
          <SmallButton title="일기 초기화" color="green" onClick={handleResetClick} />
          {image && <SmallButton title="그림 지우기" color="green" onClick={handleDeleteClick} />}
        </div>
        <BigButton
          title="일기 저장하기"
          color={`${isValid ? "yellow" : "gray"}`}
          onClick={handleSaveClick}
        />
      </div>
    </div>
  );
};

export default WriteDiaryPage;
