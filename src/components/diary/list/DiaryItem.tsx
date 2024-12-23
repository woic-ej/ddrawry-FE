import LikeIcon from "@components/iconComponents/LikeIcon";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import { format } from "date-fns";
import { BaseDiaryType } from "src/types/diaryTypes";
import { useLocation, useNavigate } from "react-router-dom";

const DiaryItem = ({ id, image, title, date, bookmark }: BaseDiaryType) => {
  const location = useLocation();
  const isLikedPage = location.pathname === "/liked";
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/diary/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-11/12 h-auto py-[15px] bg-white flex items-center justify-between border-b-[3px] border-buttonDisabled"
    >
      <div className="flex items-center gap-[15px] md:gap-[25px] lg:gap-[30px]">
        {image ? (
          <img
            src={image}
            width={180}
            height={180}
            className="w-[100px] md:w-[130px] lg:w-[150px] aspect-square rounded-[10px]"
            alt="그림일기 이미지"
          />
        ) : (
          <DefaultDiaryLogo />
        )}
        <div className="flex flex-col max-w-[150px] sm:max-w-full gap-[18px] items-start overflow-hidden">
          <div className="body-font text-left truncate w-full">{title}</div>
          <div className="smallCaption-font">{format(date, "yyyy년 M월 d일")}</div>
        </div>
      </div>
      <LikeIcon bookmark={bookmark} id={id} isLikedPage={isLikedPage} />
    </button>
  );
};

export default DiaryItem;
