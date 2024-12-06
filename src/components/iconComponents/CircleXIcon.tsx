import React from "react";
import CircleXIconImage from "@assets/svgs/CircleXIcon.svg";

interface CircleXIconProps {
  onClick: () => void;
}

const CircleXIcon: React.FC<CircleXIconProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="absolute cursor-pointer right-[-15px] top-[-15px] z-10 ">
      <img src={CircleXIconImage} alt="CircleXIcon" />
    </button>
  );
};

export default CircleXIcon;
