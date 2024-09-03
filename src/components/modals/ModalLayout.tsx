import React, { SetStateAction } from "react";

interface ModalLayoutProps {
  children: React.ReactNode;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

function ModalLayout({ children, setIsModalOpen }: ModalLayoutProps) {

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.11)]"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
}

export default ModalLayout;
