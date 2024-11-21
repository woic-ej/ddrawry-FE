import { useEffect, useState } from "react";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import { useNavigate } from "react-router-dom";
import { editDiary, hasTempDiary } from "@api/tempDiary/tempApis";
import { useDeleteDiary } from "@api/diary/useDeleteDiary";
import { EditDiaryResponse, HasTempDiaryResponse } from "src/types/tempTypes";
import html2canvas from "html2canvas";
import { postShareDiaryImage } from "@api/diary/useShareDiary";
import saveAs from "file-saver";
interface Props {
  date: string;
  diaryId: string;
  diaryRef: React.RefObject<HTMLDivElement>;
}

const DiaryButtonSection = ({ date, diaryId, diaryRef }: Props) => {
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

  const processSharedDiary = async (type: "image" | "link") => {
    if (diaryRef.current) {
      try {
        // 캔버스 생성
        const canvas = await html2canvas(diaryRef.current);

        // Blob 생성
        canvas.toBlob(async (blob) => {
          if (blob !== null) {
            const fileName = `${date}-diary.png`;

            if (type === "image") {
              // 이미지 저장 로직
              saveAs(blob, fileName);
              alert("이미지가 저장되었습니다.");
            } else if (type === "link") {
              // 이미지 URL 생성
              const imageUrl = canvas.toDataURL("image/png");

              // 서버에 이미지 업로드 및 링크 생성
              const response = await postShareDiaryImage(Number(diaryId), imageUrl);
              console.log(response.image_url);
              const shareUrl = `${window.location.origin}/shared?image=${encodeURIComponent(
                response.image_url,
              )}`;
              console.log("shareUrl:", shareUrl);

              // 클립보드에 링크 복사
              await navigator.clipboard.writeText(shareUrl);
              alert("공유 링크가 클립보드에 복사되었습니다.");
            }
          } else {
            throw new Error("Blob 생성에 실패했습니다.");
          }
        });
      } catch (error) {
        console.error(error);
        alert(`Error: ${error}`);
      }
    } else {
      alert("일기 컴포넌트를 찾을 수 없습니다.");
    }
  };

  const handleLeftClick = () => {
    processSharedDiary("image");
  };

  const handleRightClick = () => {
    processSharedDiary("link");
  };

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
            leftClick={handleLeftClick}
            rightClick={handleRightClick}
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
