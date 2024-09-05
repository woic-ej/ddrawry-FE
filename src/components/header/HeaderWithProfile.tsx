import ProfileIcon from "@components/iconComponents/ProfileIcon";
import ProfileModal from "@components/modals/ProfileModal";
import React, { useState } from "react";

interface HeaderWithProfileProps {
  title: "띠로리" | "좋아요한 일기들" | "일기 검색하기";
}

const HeaderWithProfile: React.FC<HeaderWithProfileProps> = ({ title }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const handleProfileIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  return (
    <>
      <div
        className={`z-[50] sticky top-0 flex w-full p-0 h-[82px] justify-center items-center ${
          title === "띠로리" ? "bg-Primary" : "bg-Lime"
        }`}
      >
        <p className="text-center font-[400] title-font leading-[48.96px]">{title}</p>
        <div className="absolute right-6">
          <button onClick={handleProfileIconClick}>
            <ProfileIcon />
          </button>
        </div>
      </div>
      {isProfileModalOpen && (
        <div className="absolute right-6 top-0 translate-y-[105px]">
          <ProfileModal nickName="" />
        </div>
      )}
    </>
  );
};

export default HeaderWithProfile;
