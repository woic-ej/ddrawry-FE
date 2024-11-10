import { useState } from "react";
import DefaultModal from "@components/modals/DefaultModal";
import ModalLayout from "@components/modals/ModalLayout";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import ImageEditModal from "@components/modals/ImageEditModal";
import { useFormContext } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { useSearchParams } from "react-router-dom";
import { useUpdateDiary } from "@api/diary/useUpdateDiary";
import { useWriteDiary } from "@api/diary/useWriteDiary";
import { useGetImage } from "@api/image/useGetImage";

interface Props {
  date: string;
  nickname: string;
  tempId: string;
}

const WriteDiaryButtonSection = ({ date, nickname, tempId }: Props) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [isEditPage, diaryId] = [Boolean(searchParams.get("edit")), searchParams.get("diaryId")];
  const { mutate: writeMutate } = useWriteDiary();
  const { mutate: updateMutate } = useUpdateDiary();
  const { data: imageHistory, refetch: getImageHistory } = useGetImage(tempId!);

  const {
    handleSubmit,
    watch,
    unregister,
    setValue,
    formState: { isValid },
  } = useFormContext<DiaryFormData>();

  const currentImage = watch("image");

  const handleImageHistory = () => {
    getImageHistory();
    setIsHistoryModalOpen(true);
  };

  const handleImageDeleteClick = () => {
    unregister("image");
    setIsImageModalOpen(false);
  };

  const handleSaveClick = (data: DiaryFormData) => {
    const diaryData = { ...data, nickname, date };
    if (isEditPage) {
      if (diaryId) updateMutate({ diaryId, diaryData });
    } else {
      writeMutate(diaryData);
    }
    setIsSaveModalOpen(false);
  };

  return (
    <>
      <div className="flex w-[1150px] justify-between mb-[80px]">
        <div className="flex gap-[38px]">
          <SmallButton title="띠로리 앨범" color="green" onClick={handleImageHistory} />
          {currentImage && (
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
          disabled={!isValid}
          onClick={() => setIsSaveModalOpen(true)}
        />
      </div>
      {isHistoryModalOpen && imageHistory && (
        <ModalLayout setIsModalOpen={setIsHistoryModalOpen}>
          <ImageEditModal
            images={imageHistory}
            setIsImageEditModalOpen={setIsHistoryModalOpen}
            setValue={setValue}
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
            leftClick={handleSubmit(handleSaveClick)}
            rightClick={() => setIsSaveModalOpen(false)}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default WriteDiaryButtonSection;
