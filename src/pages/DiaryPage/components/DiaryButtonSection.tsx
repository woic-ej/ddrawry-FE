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
interface Props {
  date: string;
  diaryId: string;
}

const DiaryButtonSection = ({ date, diaryId }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isTempModalOpen, setIsTempDiaryModalOpen] = useState<boolean>(false);
  const [hasTempRes, setHasTempRes] = useState<HasTempDiaryResponse | null>(null);
  const [editDiaryData, setEditDiaryData] = useState<EditDiaryResponse | null>(null);
  const { mutate: deleteDiary } = useDeleteDiary(diaryId);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    deleteDiary();
    setIsDeleteModalOpen(false);
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
    const response = await postShareDiary(Number(diaryId));
    console.log(response.token)
    const shareUrl = `${window.location.origin}/share/?id=${diaryId}&token=${response.token}`;
    console.log("shareUrl:", shareUrl);

    // 클립보드에 링크 복사
    await navigator.clipboard.writeText(shareUrl);
    alert("공유 링크가 클립보드에 복사되었습니다.");
  }

  useEffect(() => {
    if (hasTempRes) {
      if (hasTempRes.is_temp_exist) setIsTempDiaryModalOpen(true);
      else navigate(`/write/${hasTempRes.temp_id}?edit=true&diaryId=${diaryId}`);
    }

    if (editDiaryData) {
      localStorage.removeItem(`temp-diary/${hasTempRes?.temp_id}`);
      navigate(`/write/${editDiaryData.temp_id}?edit=true&diaryId=${diaryId}`);
    }
  }, [hasTempRes, editDiaryData, navigate, diaryId]);

  return (
    <>
      <div className="flex w-[1150px] justify-between mb-[80px]">
        <div className="flex gap-[38px]">
          <SmallButton title="수정하기" color="green" onClick={handleEditClick} />
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
            leftClick={handleLinkSharedDiary}
            rightClick={handleLinkSharedDiary}
          />
        </ModalLayout>
      )}
      {isTempModalOpen && (
        <ModalLayout setIsModalOpen={setIsTempDiaryModalOpen}>
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
