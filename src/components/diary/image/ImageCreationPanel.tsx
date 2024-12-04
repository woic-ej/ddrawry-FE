import React, { useState } from "react";
import SmallButton from "@components/buttons/SmallButton";
import DefaultModal from "@components/modals/DefaultModal";
import ModalLayout from "@components/modals/ModalLayout";
import { useCreateImage } from "@api/image/useCreateImage";
import { useParams } from "react-router-dom";
import { CreateImagePayLoad } from "src/types/imageTypes";
import NotificationMessage from "@components/diary/image/NotificationMessage";
import { useGetCount } from "@api/image/useGetCount";
import LoadingAnimation from "@components/loading/LoadingAnimation";

interface Props {
  date: string;
  isValidate: boolean;
  story: string;
  setValue: (field: "image", value: string) => void;
}

const ImageCreationPanel: React.FC<Props> = ({ date, isValidate, story, setValue }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { tempId } = useParams<{ tempId: string }>();
  const { mutate: createImage, isPending, isError } = useCreateImage(setValue, tempId!);
  const { data: countValue } = useGetCount(date);

  const handleDrawClick = () => {
    if (isValidate) setIsModalOpen(true);
  };

  const handleYesClick = () => {
    const storyData: CreateImagePayLoad = {
      temp_id: tempId!,
      story,
    };
    createImage(storyData);
    setIsModalOpen(false);
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  if (isPending) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-[18px] items-center justify-center w-2/3 aspect-square">
      {countValue && (
        <>
          <NotificationMessage count={countValue.remain_count} isError={isError} />
          {countValue.remain_count > 0 &&
            (countValue.image_count >= 3 ? (
              <div className="text-center regularCaption-font">
                그림 저장공간이 다 찼어요! <br />
                그림을 더 생성하고 싶으면 <span className="text-Red">띠로리 앨범</span>을 비워주세요
              </div>
            ) : (
              <SmallButton
                title={`${isError ? "다시 그려줘!" : "그림 그려줘!"}`}
                color={`${isValidate ? "green" : "gray"}`}
                onClick={handleDrawClick}
              />
            ))}
        </>
      )}

      {isModalOpen && (
        <ModalLayout modalClose={() => setIsModalOpen(false)}>
          <DefaultModal
            title="그림을 그리면 오늘 생성 가능 횟수가 소진돼요! 띠로리에게 그림을 그려달라고 할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleYesClick}
            rightClick={handleNoClick}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default ImageCreationPanel;
