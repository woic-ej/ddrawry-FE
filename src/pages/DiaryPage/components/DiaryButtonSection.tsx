import { useEffect, useState } from "react";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import { useNavigate } from "react-router-dom";
import { editDiary, hasTempDiary } from "@api/tempDiary/tempApis";
import { useDeleteDiary } from "@api/diary/useDeleteDiary";
import { EditDiaryResponse, HasTempDiaryResponse } from "src/types/tempTypes";
import { postShareDiary } from "@api/diary/useGetShareDiary";
import toast from "react-hot-toast";
import { DiaryPageModalType } from "src/types/modalType";

interface Props {
  date: string;
  diaryId: string;
}

const DiaryButtonSection = ({ date, diaryId }: Props) => {
  const [ActiveModal, setActiveModal] = useState<DiaryPageModalType>(null);
  const [hasTempRes, setHasTempRes] = useState<HasTempDiaryResponse | null>(null);
  const [editDiaryData, setEditDiaryData] = useState<EditDiaryResponse | null>(null);
  const { mutate: deleteDiary } = useDeleteDiary(diaryId, setActiveModal);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    deleteDiary();
  };

  const handleEditClick = async () => {
    const data = await hasTempDiary(date);
    setHasTempRes(data);
  };

  const cancelTempClick = async () => {
    const data = await editDiary(diaryId);
    setEditDiaryData(data);
  };

  const handleLinkSharedDiary = async () => {
    try {
      const response = await postShareDiary(Number(diaryId));
      const shareUrl = `${window.location.origin}/share/?id=${diaryId}&token=${response.token}`;

      await navigator.clipboard.writeText(shareUrl);
      toast.success("공유 링크가 클립보드에 복사되었습니다.");
    } catch (error) {
      toast.error("링크복사에 실패했습니다.");
      console.error(error);
    } finally {
      setActiveModal(null);
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (hasTempRes) {
      if (hasTempRes.is_temp_exist) setActiveModal("temp");
      else navigate(`/write/${hasTempRes.temp_id}?edit=true&diaryId=${diaryId}`);
    }

    if (editDiaryData) {
      localStorage.removeItem(`temp-diary/${hasTempRes?.temp_id}`);
      navigate(`/write/${editDiaryData.temp_id}?edit=true&diaryId=${diaryId}`);
    }
  }, [hasTempRes, editDiaryData, navigate, diaryId]);

  return (
    <>
      <div className="flex w-[800px] justify-between mb-[80px]">
        <div className="flex gap-[25px]">
          <SmallButton title="수정하기" color="green" onClick={handleEditClick} />
          <SmallButton title="지우기" color="green" onClick={() => setActiveModal("delete")} />
        </div>
        <BigButton title="일기 자랑하기" color="blue" onClick={() => setActiveModal("share")} />
      </div>
      {ActiveModal === "delete" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="앗 이 일기를 지울까요??"
            leftText="넹"
            rightText="아니용"
            leftClick={handleDeleteClick}
            rightClick={handleModalClose}
          />
        </ModalLayout>
      )}
      {ActiveModal === "share" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="짱 멋진 일기를 링크로 자랑할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleLinkSharedDiary}
            rightClick={handleModalClose}
          />
        </ModalLayout>
      )}
      {ActiveModal === "temp" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="임시저장된 일기가 있는데 불러올까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={() => navigate(`/write/${hasTempRes?.temp_id}?edit=true&diaryId=${diaryId}`)}
            rightClick={cancelTempClick}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default DiaryButtonSection;
