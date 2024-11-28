import React from "react";
import ReactDOM from "react-dom";

interface ModalLayoutProps {
  children: React.ReactNode;
  modalClose?: () => void;
}

function ModalLayout({ children, modalClose }: ModalLayoutProps) {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget && modalClose) {
      modalClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.11)]"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>,
    document.body,
  );
}

export default ModalLayout;
