import React, { useState } from "react";
import DefaultModal from "@components/modals/DefaultModal";
import ModalLayout from "@components/modals/ModalLayout";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import useDiaryStore from "@store/diaryStore";
import useImageStore from "@store/imageStore";
import ImageEditModal from "@components/modals/ImageEditModal";

interface Props {
  images: string[];
}

const WriteDiaryButtonSection: React.FC<Props> = ({ images }) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const { content, limitLength, clearAll } = useDiaryStore();
  const { image, clearImage } = useImageStore();
  const isValid = content.length >= limitLength;

  const handleImageHistory = () => {
    setIsHistoryModalOpen(true);
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
    <>
      <div className="flex w-[1150px] justify-between mb-[80px]">
        <div className="flex gap-[38px]">
          <SmallButton title="띠로리 앨범" color="green" onClick={handleImageHistory} />
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
      {isHistoryModalOpen && (
        <ModalLayout setIsModalOpen={setIsHistoryModalOpen}>
          <ImageEditModal images={images} setIsImageEditModalOpen={setIsHistoryModalOpen} />
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
    </>
  );
};

export default WriteDiaryButtonSection;
