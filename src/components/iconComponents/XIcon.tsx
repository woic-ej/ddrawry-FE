import React from "react";
import XIconImage from "@assets/svgs/XIcon.svg";

interface XIconProps {
  handleXIconClick: () => void;
}

const XIcon: React.FC<XIconProps> = ({ handleXIconClick }) => {
  return (
    <button onClick={handleXIconClick} className="absolute top-0 right-0">
      <img src={XIconImage} width={32} height={32} alt="XIcon" />
    </button>
  );
};

export default XIcon;
