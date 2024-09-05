import { useDarkMode } from "@hooks/useDarkMode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "./ModalLayout";
import ChangeNameModal from "./ChangeNameModal";
import DefaultModal from "./DefaultModal";

interface ProfileModalProps {
  nickName: string;
}

const profileItems = ["닉네임 수정하기", "좋아요한 일기들", "로그아웃", "회원탈퇴", "다크 모드"];

const ProfileModal: React.FC<ProfileModalProps> = ({ nickName }) => {
  const [isChangeNameModalOpen, setIsChangeNameModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    setIsDeleteAccountModalOpen(false);
    localStorage.clear();
    navigate("/login");
  };

  const handleClick = (item: string) => {
    switch (item) {
      case "닉네임 수정하기":
        setIsChangeNameModalOpen(true);
        break;
      case "좋아요한 일기들":
        navigate("/liked");
        break;
      case "로그아웃":
        setIsLogoutModalOpen(true);
        break;
      case "회원탈퇴":
        setIsDeleteAccountModalOpen(true);
        break;
      case "다크 모드":
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col w-[400px] h-[340px] body-font text-center leading-[38.08px] p-[20px] gap-[27px] border border-ButtonDisabledStroke shadow-custom z-10 bg-white">
      {profileItems.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className="flex justify-between items-center cursor-pointer"
        >
          <span>{item}</span>
          {item === "다크 모드" && (
            <div
              onClick={toggleDarkMode}
              className={`relative w-[85.91px] h-[38px] rounded-[35px] cursor-pointer  transition-colors ${
                isDarkMode ? "bg-Lime" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute w-[30px] h-[30px] bg-white rounded-full translate-y-1 transition-transform ${
                  isDarkMode ? "translate-x-[50px]" : "translate-x-[5px]"
                }`}
              />
            </div>
          )}
        </div>
      ))}
      {isChangeNameModalOpen && (
        <ModalLayout setIsModalOpen={setIsChangeNameModalOpen}>
          <ChangeNameModal currentName={nickName} setIsModalOpen={setIsChangeNameModalOpen} />
        </ModalLayout>
      )}
      {isLogoutModalOpen && (
        <ModalLayout setIsModalOpen={setIsLogoutModalOpen}>
          <DefaultModal
            title="로그아웃을 하시겠습니까?"
            leftText="네"
            rightText="아니요"
            leftClick={handleLogout}
            rightClick={() => setIsLogoutModalOpen(false)}
          />
        </ModalLayout>
      )}
      {isDeleteAccountModalOpen && (
        <ModalLayout setIsModalOpen={setIsDeleteAccountModalOpen}>
          <DefaultModal
            title="회원탈퇴를 하시겠습니까?"
            leftText="네"
            rightText="아니요"
            leftClick={handleDeleteAccount}
            rightClick={() => setIsDeleteAccountModalOpen(false)}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default ProfileModal;
