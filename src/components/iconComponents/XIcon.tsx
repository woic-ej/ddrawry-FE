import React, { Dispatch, SetStateAction } from 'react'
import XIconImage from "@assets/svgs/XIcon.svg";

interface XIconProps {
    handleXIconClick: () => void;
}

const XIcon: React.FC<XIconProps> = ({ handleXIconClick }) => {
    return (
      <button>
        <img
          src={XIconImage}
          width={32}
          height={32}
          alt="XIcon"
          onClick={handleXIconClick}
          className="cursor-pointer absolute top-0 right-0"
        />
      </button>
    );
};

export default XIcon