import React from "react";

interface ModalButtonProps {
  title: "넹" | "아니용" | string;
  onClick: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="flex justify-center items-center w-[130px] h-[50px] rounded-[15px] gap-[10px] border text-regular bg-Lemon border-LemonStroke text-Charcoal"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ModalButton;
