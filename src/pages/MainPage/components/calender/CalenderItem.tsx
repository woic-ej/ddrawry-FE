import React, { useState } from "react";
import DefaultLogo from "@assets/images/calenderItem-logo.png";
import Like from "@pages/MainPage/components/icons/Like";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import { format } from "date-fns";
import { useCancelTempDiary } from "@api/tempDiary/useCancelTempDiary";
import { hasTempDiary } from "@api/tempDiary/tempApis";
import { HasTempDiaryResponse } from "src/types/tempTypes";

interface Props {
  day: string;
  isValidate: boolean;
  isFutureDate: boolean; // 오늘 이후 날짜 여부
  hasContent: boolean;
  imageUrl?: string | null;
  bookmark?: boolean;
  id: number | undefined;
  currentDate: Date;
}

const CalenderItem: React.FC<Props> = ({
  day,
  isValidate,
  isFutureDate,
  hasContent,
  imageUrl,
  bookmark,
  id,
  currentDate,
}) => {
  const navigate = useNavigate();
  const [isTempModalOpen, setIsTempModalOpen] = useState<boolean>(false);
  const formattedDate = format(currentDate, "yyyyMMdd");
  const [getIsExistTemp, setGetIsExistTemp] = useState<HasTempDiaryResponse>();
  const { mutate: cancelTemp } = useCancelTempDiary(String(getIsExistTemp?.temp_id));
  const postDate = format(currentDate, "yyyy-MM-dd");
  
  const renderImage = () => {
    if (!hasContent) return null;

    return (
      <>
        <img
          src={imageUrl || DefaultLogo}
          className={`${imageUrl && "calender-item object-cover"} `}
          alt={imageUrl ? "그림일기 이미지" : "기본 로고 이미지"}
        />
        {bookmark && (
          <div className="absolute">
            <Like />
          </div>
        )}
      </>
    );
  };

  const containerClassNames = classNames(
    "calender-item relative flex justify-center items-center",
    {
      "cursor-pointer": !isFutureDate,
      "text-ButtonDisabledStroke text-regular": !isValidate,
      "bg-white body-font": isValidate,
      "bg-[#F0F0F0]": isTempModalOpen,
    },
  );

  const handleCalenderItemClick = async() => {
    // 오늘 이후 날짜는 클릭 X
    if (!isFutureDate && hasContent) {
      navigate(`/diary/${id}`);
    } else if (!isFutureDate) {
      try {
        const data = await hasTempDiary(formattedDate);
        setGetIsExistTemp(data)
        if (data.is_temp_exist) {
          setIsTempModalOpen(true);
        } else {
          navigate(`/write/${data?.temp_id}`);
        }
      }
      catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <>
      <div className={containerClassNames} onClick={handleCalenderItemClick} key={day}>
        {renderImage()}
        <span className="absolute">{day}</span>
      </div>
      {isTempModalOpen && getIsExistTemp && (
        <ModalLayout setIsModalOpen={setIsTempModalOpen}>
          <DefaultModal
            title="임시 저장된 일기를 불러올까요?"
            leftText="네"
            rightText="아니요"
            leftClick={() => navigate(`/write/${getIsExistTemp.temp_id}`)}
            rightClick={() => {
              setIsTempModalOpen(false);
              cancelTemp({ date: postDate, type: "main" });
            }}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CalenderItem;
