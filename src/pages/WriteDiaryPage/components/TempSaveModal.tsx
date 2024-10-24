import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import React, { useEffect, useState } from "react";
import {
  SaveTempDiaryPayload,
  useCancelTempDiary,
  useSaveTempDiary,
} from "@api/diary/useTempDiary";

interface Props {
  date: string;
  tempId: string;
}

const TempSaveModal = ({ date, tempId }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isBlocking, setIsBlocking] = useState<boolean>(true);
  const { mutate: saveTemp } = useSaveTempDiary(tempId);
  const { mutate: cancelTemp } = useCancelTempDiary(tempId);

  useEffect(() => {
    const isInitialLoad = sessionStorage.getItem("initialLoad") === null;

    const handlePopState = (event: PopStateEvent) => {
      if (isBlocking) {
        event.preventDefault(); // 기본 뒤로 가기 동작 방지
        setShowModal(true); // 모달을 띄움
      }
    };

    if (isInitialLoad) {
      sessionStorage.setItem("initialLoad", "true");
      history.pushState(null, "", window.location.href);
    }

    // popstate 이벤트 리스너 등록
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState); // 이벤트 해제
    };
  }, [isBlocking]);

  const handleSave = () => {
    const tempData: SaveTempDiaryPayload = JSON.parse(
      localStorage.getItem(`temp-diary/${tempId}`)!,
    );
    setShowModal(false);
    setIsBlocking(false);
    saveTemp(tempData);
  };

  const handleCancel = () => {
    setShowModal(false);
    cancelTemp({ date, type: "write" });
  };

  return (
    <>
      {showModal && (
        <ModalLayout setIsModalOpen={setShowModal}>
          <DefaultModal
            title="현재 작성중인 일기를 임시저장 할까요??"
            leftText="넹"
            rightText="아니용"
            leftClick={handleSave}
            rightClick={handleCancel}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default React.memo(TempSaveModal);
