import { useState } from "react";
import DefaultModal from "@components/modals/DefaultModal";
import ModalLayout from "@components/modals/ModalLayout";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import ImageEditModal from "@components/modals/ImageEditModal";
import { useFormContext } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateDiary } from "@api/diary/useUpdateDiary";
import { useWriteDiary } from "@api/diary/useWriteDiary";
import { useUpdateStore } from "@store/useUpdateStore";

interface Props {
  date: string;
  nickname: string;
  tempId: string;
  isValid: boolean;
  isDirty: boolean;
}

type WriteDiaryModalType = "save" | "remove" | "imageHistory" | null;

const WriteDiaryButtonSection = ({ date, nickname, tempId, isValid, isDirty }: Props) => {
  const { isUpdate, setIsUpdate } = useUpdateStore();
  const [activeModal, setActiveModal] = useState<WriteDiaryModalType>(null);
  const [searchParams] = useSearchParams();
  const [isEditPage, diaryId] = [Boolean(searchParams.get("edit")), searchParams.get("diaryId")];
  const { mutate: writeMutate } = useWriteDiary();
  const { mutate: updateMutate } = useUpdateDiary();
  const { handleSubmit, watch, unregister, setValue } = useFormContext<DiaryFormData>();
  const navigate = useNavigate();

  const currentImage = watch("image");

  const handleImageHistory = () => {
    setActiveModal("imageHistory");
  };

  const handleImageDeleteClick = () => {
    unregister("image");
    setIsUpdate(true);
    setActiveModal(null);
  };

  const handleSaveClick = (data: DiaryFormData) => {
    const diaryData = { ...data, nickname, date };
    if (isEditPage) {
      if (isDirty || isUpdate) {
        if (diaryId) updateMutate({ diaryId, diaryData });
      } else {
        navigate(-2);
        localStorage.removeItem(`temp-diary/${tempId}`);
      }
    } else {
      writeMutate(diaryData);
    }
    setActiveModal(null);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="flex w-11/12 md:w-[600px] lg:w-[800px] mb-[2.5rem] md:mb-[50px]">
        <div className="flex w-1/2 gap-[10px] md:gap-[20px] lg:gap-[25px]">
          <SmallButton title="띠로리 앨범" color="green" onClick={handleImageHistory} />
          {currentImage && (
            <SmallButton
              title="그림 지우기"
              color="green"
              onClick={() => setActiveModal("remove")}
            />
          )}
        </div>
        <div className="w-1/2">
          <BigButton
            title="일기 저장하기"
            color={`${isValid ? "yellow" : "gray"}`}
            disabled={!isValid}
            onClick={() => setActiveModal("save")}
          />
        </div>
      </div>
      {activeModal === "imageHistory" && (
        <ModalLayout modalClose={handleModalClose}>
          <ImageEditModal
            tempId={tempId}
            imageEditModalClose={handleModalClose}
            setValue={setValue}
            setIsUpdate={setIsUpdate}
          />
        </ModalLayout>
      )}
      {activeModal === "remove" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="이 그림을 현재 일기장에서 지울까요?
            ( 그림이 앨범에서 삭제되지는 않아요! )"
            leftText="넹"
            rightText="아니용"
            leftClick={handleImageDeleteClick}
            rightClick={handleModalClose}
          />
        </ModalLayout>
      )}
      {activeModal === "save" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="이대로 일기를 저장할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleSubmit(handleSaveClick)}
            rightClick={handleModalClose}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default WriteDiaryButtonSection;
