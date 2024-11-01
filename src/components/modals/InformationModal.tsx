import React, { SetStateAction } from "react";
import XIcon from "@assets/images/XIcon.png";

interface Props {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const InformationModal: React.FC<Props> = ({ setIsModalOpen }) => {
  return (
    <div
      className="flex flex-col relative bg-white w-[683px] h-[453px] rounded-[30px] pt-[60px] gap-[40px] border body-font leading-[38.08px]"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={XIcon}
        alt="닫기 아이콘"
        width={36}
        height={36}
        className="absolute right-[20px] top-[20px] cursor-pointer"
        onClick={() => setIsModalOpen(false)}
      />
      <div className="flex justify-center">띠로리 사용방법!</div>
      <div className="pl-[80px] flex flex-col gap-[4px] font-[400] text-[28px]">
        <p>step 1 {")"} 달력에서 작성하고 싶은 날짜를 클릭</p>
        <p className="pl-[105px]">
          {"("}단, <span className="text-[#F46666]">오늘 날짜</span> 이후로는 작성 X{")"}
        </p>
        <p>step 2 {")"} 일기 작성 페이지로 이동!</p>
        <p>step 3 {")"} 끝내주게 일기 쓰기</p>
        <p className="pl-[105px]">
          {"("}일기당 그림은 <span className="text-[#F46666]">최대 3개</span>까지 보관 가능{")"}
        </p>
        <p>step 4 {")"} 멋진 그림 일기 완성</p>
      </div>
    </div>
  );
};

export default InformationModal;
