import React from "react";
import kakaoIcon from "@assets/svgs/KakaoIcon.svg";

interface KakaoButtonProps {
  onClick: () => void;
}

const KakaoButton: React.FC<KakaoButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex justify-center items-center gap-[8px] bg-[#FAE100] rounded-[8px] w-[435px] h-[60px] font-[500] text-[18px] leading-[25.2px]"
      onClick={onClick}
    >
      <img src={kakaoIcon} alt="kakaoIcon" width={27} height={26} />
      카카오로 로그인하기
    </button>
  );
};

export default KakaoButton;
