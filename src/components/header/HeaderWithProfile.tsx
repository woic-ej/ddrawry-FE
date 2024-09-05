import ProfileIcon from "@components/iconComponents/ProfileIcon";
import React from "react";

interface HeaderWithProfileProps {
  title: "띠로리" | "좋아요한 일기들" | "일기 검색하기";
}

const HeaderWithProfile: React.FC<HeaderWithProfileProps> = ({ title }) => {
  return (
      <div
        className={`sticky top-0 flex w-full p-0 h-[82px] justify-center items-center ${
          title === "띠로리" ? "bg-Primary" : "bg-Lime"
        }`}
      >
        <p className="text-center title-font leading-[48.96px]">{title}</p>
        <div className="absolute right-4">
          <ProfileIcon />
        </div>
      </div>
  );
};

export default HeaderWithProfile;
