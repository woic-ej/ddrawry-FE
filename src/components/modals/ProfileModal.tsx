import LoadingSpinner from "@components/loading/LoadingSpinner";
import React, { Suspense, useState } from "react";
import ModalLayout from "@components/modals/ModalLayout";
import informationIcon from "@assets/images/information.png";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@hooks/useDarkMode";
import { useLogout } from "@api/users/useLogout";
import { useDeleteAccount } from "@api/users/useDeleteAccount";
import { useConfirmProfile } from "@api/users/useConfirmProfile";
import { useDateStore } from "@store/useDateStore";
import DefaultModal from "@components/modals/DefaultModal";
import { ActiveModal } from "src/types/modalType";
import toast from "react-hot-toast";
import InformationModal from "@components/modals/InformationModal";

const ChangeNameModal = React.lazy(() => import("@components/modals/ChangeNameModal"));

const profileItems: ProfileItemsType[] = [
  { label: "닉네임 수정하기", modal: "changeName" },
  { label: "좋아요한 일기들", action: "navigate", path: "/liked" },
  { label: "로그아웃", modal: "logout" },
  { label: "회원탈퇴", modal: "deleteAccount" },
  { label: "다크 모드", action: "toggleDarkMode" },
  { label: "도움말", modal: "information" },
];

type ProfileItemsType = {
  label: string;
  modal?: ActiveModal;
  path?: string;
  action?: string;
};

const ProfileModal = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { clearCurrentDate } = useDateStore();
  const logoutMutation = useLogout(setActiveModal);
  const deleteAccount = useDeleteAccount(setActiveModal);
  const { data: userProfileData, isError, error, refetch } = useConfirmProfile();

  const handleClick = (item: ProfileItemsType) => {
    if (item.action === "navigate" && item.path) {
      clearCurrentDate();
      navigate(item.path);
    } else if (item.action === "toggleDarkMode") {
      toggleDarkMode();
    } else if (item.modal) {
      if (item.modal === "changeName" && isError) {
        toast.error(error.message);
      } else {
        if (item.modal === "changeName") refetch();
        setActiveModal(item.modal);
      }
    }
  };

  return (
    <div className="profile-modal-layout">
      {profileItems.map((item) => (
        <div
          key={item.label}
          onClick={() => handleClick(item)}
          className="flex justify-between items-center cursor-pointer"
        >
          <span>
            {item.label === "도움말" ? (
              <div className="flex items-center gap-[3px]">
                {item.label}
                <img src={informationIcon} className="w-[25px] h-[25px]" alt="도움말 아이콘" />
              </div>
            ) : (
              item.label
            )}
          </span>
          {item.label === "다크 모드" && (
            <div
              className={`relative w-[85.91px] h-[38px] rounded-[35px] cursor-pointer transition-colors ${
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
      {activeModal === "changeName" && userProfileData && (
        <ModalLayout setIsModalOpen={() => setActiveModal(null)}>
          <Suspense fallback={<LoadingSpinner />}>
            <ChangeNameModal
              currentName={userProfileData.data.nickname}
              setIsModalOpen={() => setActiveModal(null)}
            />
          </Suspense>
        </ModalLayout>
      )}
      {activeModal === "logout" && (
        <ModalLayout setIsModalOpen={() => setActiveModal(null)}>
          <DefaultModal
            title="로그아웃을 하시겠습니까?"
            leftText="네"
            rightText="아니요"
            leftClick={logoutMutation.mutate}
            rightClick={() => setActiveModal(null)}
          />
        </ModalLayout>
      )}
      {activeModal === "deleteAccount" && (
        <ModalLayout setIsModalOpen={() => setActiveModal(null)}>
          <DefaultModal
            title="회원탈퇴를 하시겠습니까?"
            leftText="네"
            rightText="아니요"
            leftClick={deleteAccount.mutate}
            rightClick={() => setActiveModal(null)}
          />
        </ModalLayout>
      )}
      {activeModal === "information" && (
        <ModalLayout setIsModalOpen={() => setActiveModal(null)}>
          <InformationModal setIsModalOpen={() => setActiveModal(null)} />
        </ModalLayout>
      )}
    </div>
  );
};

export default ProfileModal;
