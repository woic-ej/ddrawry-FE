import React, { useState } from "react";
import XIcon from "@assets/images/XIcon.webp";
import { useCookies } from "react-cookie";

interface Props {
  InformationModalClose: () => void;
  isMainPage?: boolean;
}

const InformationModal: React.FC<Props> = ({ InformationModalClose, isMainPage }) => {
  const [, setCookie] = useCookies(["hideForOneDay", "hideForever"]);
  const [isOneDayChecked, setIsOneDayChecked] = useState(false);
  const [isForeverChecked, setIsForeverChecked] = useState(false);

  const handleOneDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOneDayChecked(e.target.checked);
  };

  const handleForeverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsForeverChecked(e.target.checked);
  };

  const handleCloseInformationModal = () => {
    const cookieOption = {
      path: "/",
      secure: true,
      sameSite: true,
    };

    if (isOneDayChecked) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 1);
      setCookie("hideForOneDay", "true", {
        ...cookieOption,
        expires: expiryDate,
      });
    }

    if (isForeverChecked) {
      setCookie("hideForever", "true", { ...cookieOption });
    }

    InformationModalClose();
  };

  return (
    <div
      className="flex flex-col items-center relative bg-white w-[300px] md:w-[400px] lg:w-[550px] rounded-[30px] py-[50px] md:py-[50px] lg:py-[60px] gap-[40px] border body-font "
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={XIcon}
        alt="닫기 아이콘"
        width={36}
        height={36}
        className="w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] absolute right-[20px] top-[20px] cursor-pointer"
        onClick={handleCloseInformationModal}
      />
      <div className="flex justify-center ">띠로리 사용방법!</div>
      <div className=" flex flex-col w-fit h-fit gap-[4px] font-[600] body-font">
        <p>step 1 {")"} 달력에서 작성하고 싶은 날짜를 클릭</p>
        <p className="pl-[50px] md:pl-[105px]">
          {"("}단, <span className="text-[#F46666]">오늘 날짜</span> 이후로는 작성 X{")"}
        </p>
        <p>step 2 {")"} 일기 작성 페이지로 이동!</p>
        <p>step 3 {")"} 끝내주게 일기 쓰기</p>
        <p className="pl-[50px] md:pl-[105px]">
          {"("}일기당 그림은 <span className="text-[#F46666]">최대 3개</span>까지 보관 가능{")"}
        </p>
        <p>step 4 {")"} 멋진 그림 일기 완성</p>
      </div>
      {isMainPage && (
        <div className="flex gap-5 md:gap-10">
          <label className="flex gap-1">
            <input type="checkbox" checked={isOneDayChecked} onChange={handleOneDayChange} />
            하루동안 보지 않기
          </label>
          <label className="flex gap-1">
            <input type="checkbox" checked={isForeverChecked} onChange={handleForeverChange} />
            앞으로 보지 않기
          </label>
        </div>
      )}
    </div>
  );
};

export default InformationModal;
