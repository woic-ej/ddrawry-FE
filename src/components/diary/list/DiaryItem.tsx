import LikeIcon from "@components/iconComponents/LikeIcon";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import { format } from "date-fns";
import { DiaryListType } from "src/types/diaryTypes";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, image, title, date, bookmark }: DiaryListType) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/diary/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="min-w-[1012.53px] h-[275px] bg-white flex items-center justify-between border-b-[3px] border-buttonDisabled"
    >
      <div className="flex items-center gap-[46px]">
        {image ? (
          <img src={image} className="w-[256px] h-[230px] rounded-[10px]" alt="그림일기 이미지" />
        ) : (
          <DefaultDiaryLogo />
        )}
        <div className="flex flex-col gap-[18px] items-start">
          <div className="body-font">{title}</div>
          <div className="smallCaption-font">{format(date, "yyyy년 M월 d일")}</div>
        </div>
      </div>
      <LikeIcon bookmark={bookmark} id={id} isListPage />
    </button>
  );
};

export default DiaryItem;
