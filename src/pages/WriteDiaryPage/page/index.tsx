import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import Diary from "@components/diary/Diary";
import DefaultHeader from "@components/header/DefaultHeader";
import DefaultModal from "@components/modals/DefaultModal";
import ModalLayout from "@components/modals/ModalLayout";
import useDiaryStore from "@store/diaryStore";
import useImageStore from "@store/imageStore";
import React, { useState } from "react";

const WriteDiaryPage: React.FC = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const { content, clearContent, limitLength, clearAll } = useDiaryStore();
  const { image, clearImage } = useImageStore();
  const isValid = content.length >= limitLength;

  const handleResetClick = () => {
    clearContent();
    setIsResetModalOpen(false);
  };

  const handleImageDeleteClick = () => {
    clearImage();
    setIsImageModalOpen(false);
  };

  const handleSaveClick = () => {
    console.log("저장됨"); // api 호출로 후에 처리
    clearImage();
    clearAll();
    setIsSaveModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <DefaultHeader title="일기 쓰기" />
      <Diary date="2024년 8월 10일" name="최은진" count={3} isFull={false} />
      <div className="flex w-[1150px] justify-between mb-[80px]">
        <div className="flex gap-[38px]">
          <SmallButton
            title="일기 초기화"
            color="green"
            onClick={() => setIsResetModalOpen(true)}
          />
          {image && (
            <SmallButton
              title="그림 지우기"
              color="green"
              onClick={() => setIsImageModalOpen(true)}
            />
          )}
        </div>
        <BigButton
          title="일기 저장하기"
          color={`${isValid ? "yellow" : "gray"}`}
          onClick={() => isValid && setIsSaveModalOpen(true)}
        />
      </div>
      {isResetModalOpen && (
        <ModalLayout setIsModalOpen={setIsResetModalOpen}>
          <DefaultModal
            title="일기를 초기화 할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleResetClick}
            rightClick={() => setIsResetModalOpen(false)}
          />
        </ModalLayout>
      )}
      {isImageModalOpen && (
        <ModalLayout setIsModalOpen={setIsImageModalOpen}>
          <DefaultModal
            title="이 그림을 삭제할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleImageDeleteClick}
            rightClick={() => setIsImageModalOpen(false)}
          />
        </ModalLayout>
      )}
      {isSaveModalOpen && (
        <ModalLayout setIsModalOpen={setIsSaveModalOpen}>
          <DefaultModal
            title="이대로 일기를 저장할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleSaveClick}
            rightClick={() => setIsSaveModalOpen(false)}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default WriteDiaryPage;
