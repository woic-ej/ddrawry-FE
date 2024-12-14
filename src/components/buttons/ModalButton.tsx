import React from "react";

interface ModalButtonProps {
  title: "넹" | "아니용" | string;
  onClick: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="flex justify-center items-center w-[100px] h-[40px] lg:w-[130px] lg:h-[50px] rounded-[15px] border body-font bg-Lemon border-LemonStroke text-Charcoal"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ModalButton;
