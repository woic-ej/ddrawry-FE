import { useState } from "react";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import { useDeleteDiary } from "@api/diary/useDiary";

interface Props {
  diaryId: string;
}

const DiaryButtonSection = ({ diaryId }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const { mutate } = useDeleteDiary(diaryId);

  const handleDeleteClick = () => {
    mutate();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex w-[1150px] justify-between mb-[80px]">
        <div className="flex gap-[38px]">
          <SmallButton title="수정하기" color="green" />
          <SmallButton title="지우기" color="green" onClick={() => setIsDeleteModalOpen(true)} />
        </div>
        <BigButton title="일기 자랑하기" color="blue" onClick={() => setIsShareModalOpen(true)} />
      </div>
      {isDeleteModalOpen && (
        <ModalLayout setIsModalOpen={setIsDeleteModalOpen}>
          <DefaultModal
            title="앗 이 일기를 지울까요??"
            leftText="넹"
            rightText="아니용"
            leftClick={handleDeleteClick}
            rightClick={() => setIsDeleteModalOpen(false)}
          />
        </ModalLayout>
      )}
      {isShareModalOpen && (
        <ModalLayout setIsModalOpen={setIsShareModalOpen}>
          <DefaultModal
            title="짱 멋진 일기를 어떻게 자랑할까요?"
            leftText="이미지로"
            rightText="링크로"
            leftClick={() => console.log("이미지로 공유")}
            rightClick={() => console.log("링크로 공유")}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default DiaryButtonSection;
