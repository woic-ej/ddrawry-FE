import LoadingSpinner from "@components/loading/LoadingSpinner";
import React, { Suspense, useState } from "react";
import ModalLayout from "@components/modals/ModalLayout";
import informationIcon from "@assets/images/information.webp";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@api/users/useLogout";
import { useDeleteAccount } from "@api/users/useDeleteAccount";
import { useConfirmProfile } from "@api/users/useConfirmProfile";
import DefaultModal from "@components/modals/DefaultModal";
import { ProfileModalType } from "src/types/modalType";
import toast from "react-hot-toast";
import InformationModal from "@components/modals/InformationModal";

const ChangeNameModal = React.lazy(() => import("@components/modals/ChangeNameModal"));

const profileItems: ProfileItemsType[] = [
  { label: "닉네임 수정하기", modal: "changeName" },
  { label: "좋아요한 일기들", action: "navigate", path: "/liked" },
  { label: "로그아웃", modal: "logout" },
  { label: "회원탈퇴", modal: "deleteAccount" },
  { label: "도움말", modal: "information" },
  {
    label: "피드백 남기기",
    action: "link",
    path: "https://form.naver.com/response/tl_CsSgLR1y7Hmxe6wbB0A",
  },
];

type ProfileItemsType = {
  label: string;
  modal?: ProfileModalType;
  path?: string;
  action?: string;
};

const ProfileModal = () => {
  const [activeModal, setActiveModal] = useState<ProfileModalType>(null);
  const navigate = useNavigate();
  const logoutMutation = useLogout(setActiveModal);
  const deleteAccount = useDeleteAccount(setActiveModal);
  const { data: userProfileData, isError, error, refetch } = useConfirmProfile();

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleClick = (item: ProfileItemsType) => {
    if (item.action === "navigate" && item.path) {
      navigate(item.path);
    } else if (item.action === "link" && item.path) {
      window.open(item.path, "_black");
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
                <img
                  src={informationIcon}
                  className="w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]"
                  alt="도움말 아이콘"
                />
              </div>
            ) : (
              item.label
            )}
          </span>
        </div>
      ))}
      {activeModal === "changeName" && userProfileData && (
        <ModalLayout modalClose={handleModalClose}>
          <Suspense fallback={<LoadingSpinner />}>
            <ChangeNameModal
              currentName={userProfileData.data.nickname}
              changeModalClose={handleModalClose}
            />
          </Suspense>
        </ModalLayout>
      )}
      {activeModal === "logout" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="로그아웃을 하시겠습니까?"
            leftText="네"
            rightText="아니요"
            leftClick={logoutMutation.mutate}
            rightClick={handleModalClose}
          />
        </ModalLayout>
      )}
      {activeModal === "deleteAccount" && (
        <ModalLayout modalClose={handleModalClose}>
          <DefaultModal
            title="회원탈퇴를 하시겠습니까?"
            leftText="네"
            rightText="아니요"
            leftClick={deleteAccount.mutate}
            rightClick={handleModalClose}
          />
        </ModalLayout>
      )}
      {activeModal === "information" && (
        <ModalLayout modalClose={handleModalClose}>
          <InformationModal InformationModalClose={handleModalClose} />
        </ModalLayout>
      )}
    </div>
  );
};

export default ProfileModal;
