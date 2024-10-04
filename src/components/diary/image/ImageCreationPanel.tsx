import React, { useState } from "react";
import SmallButton from "@components/buttons/SmallButton";
import useImageStore from "@store/imageStore";
import DefaultModal from "@components/modals/DefaultModal";
import ModalLayout from "@components/modals/ModalLayout";

interface Props {
  count: number;
  isFull: boolean;
  isValidate: boolean;
}

const NotificationMessage: React.FC<Pick<Props, "count">> = ({ count }) => {
  if (count > 0) {
    return (
      <div className="body-font">
        ( 오늘 생성 가능 횟수 :{" "}
        <span className={`${count > 1 ? "text-Primary" : "text-Red"}`}>{count}회</span> )
      </div>
    );
  } else {
    return <div className="regularCaption-font">오늘 그림 생성 기회를 다 써버렸어요 ㅠㅠ</div>;
  }
};

const ImageCreationPanel: React.FC<Props> = ({ count, isFull, isValidate }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { setImage } = useImageStore();

  const handleDrawClick = () => {
    setIsModalOpen(true);
  };

  const handleYesClick = () => {
    setImage("생성된 그림"); // api 호출로 대체
    setIsModalOpen(false);
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-[18px] items-center">
      <NotificationMessage count={count} />
      {count > 0 &&
        (isFull ? (
          <div className="text-center regularCaption-font">
            그림 저장공간이 다 찼어요! <br />
            그림을 더 생성하고 싶으면 저장 공간을 비워주세요
          </div>
        ) : (
          <SmallButton
            title="그림 그려줘!"
            color={`${isValidate ? "green" : "gray"}`}
            onClick={handleDrawClick}
          />
        ))}
      {isModalOpen && (
        <ModalLayout setIsModalOpen={setIsModalOpen}>
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
