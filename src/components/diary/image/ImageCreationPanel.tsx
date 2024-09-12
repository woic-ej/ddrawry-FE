import React from "react";
import ImagesHistoryButton from "@components/diary/image/ImagesHistoryButton";
import SmallButton from "@components/buttons/SmallButton";
import useImageStore from "@store/imageStore";

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
  const { setImage } = useImageStore();
  const handleDrawClick = () => {
    setImage("생성된 그림"); // api 호출로 대체
  };

  return (
    <div className="flex flex-col gap-[18px] items-center">
      <ImagesHistoryButton isFull={isFull} />
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
    </div>
  );
};

export default ImageCreationPanel;
