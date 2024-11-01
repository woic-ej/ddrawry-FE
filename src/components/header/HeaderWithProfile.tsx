import { useConfirmProfile } from "@api/users/useConfirmProfile";
import ProfileIcon from "@components/iconComponents/ProfileIcon";
import ProfileModal from "@components/modals/ProfileModal";
import React, { useState } from "react";

interface HeaderWithProfileProps {
  title: "띠로리" | "좋아요한 일기들" | "일기 검색하기";
}

const HeaderWithProfile: React.FC<HeaderWithProfileProps> = ({ title }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const { data: userProfileData } = useConfirmProfile();

  const handleProfileIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  return (
    <>
      <div
        className={`z-[50] sticky top-0 flex w-full p-0 min-h-[82px] justify-center items-center min-w-[990px] ${
          title === "띠로리" ? "bg-Primary" : "bg-Lime"
        }`}
      >
        <p className="text-center title-font leading-[48.96px]">{title}</p>
        <div className="absolute right-6">
          <button onClick={handleProfileIconClick}>
            <ProfileIcon />
          </button>
        </div>
      </div>
      {isProfileModalOpen && (
        <div className="z-[10] fixed right-6 top-0 translate-y-[105px]">
          {userProfileData && <ProfileModal nickName={userProfileData.data.nickname} />}
        </div>
      )}
    </>
  );
};

export default HeaderWithProfile;
