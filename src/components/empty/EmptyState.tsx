import React from "react";
import LogoTextOnly from "@assets/images/logoTextOnly.png";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="relative flex flex-col h-[100%] justify-center items-center gap-[30px]">
      <img src={LogoTextOnly} width={220} height={50} alt="LogoText" />
      <div className="hugeCaption-font leading-[48.96px]">{message}</div>
    </div>
  );
};

export default EmptyState;
