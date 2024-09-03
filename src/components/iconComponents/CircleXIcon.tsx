import React from 'react'
import CircleXIconImage from "@assets/svgs/CircleXIcon.svg"

interface CircleXIconProps{
    onClick: () => void;
}

const CircleXIcon: React.FC<CircleXIconProps> = ({ onClick }) => {
    return (
      <button onClick={onClick}>
        <img
          src={CircleXIconImage}
          alt="CircleXIcon"
          width={42}
          height={42}
          className="absolute cursor-pointer right-[68px] top-[10px] z-10 "
        />
      </button>
    );
};

export default CircleXIcon