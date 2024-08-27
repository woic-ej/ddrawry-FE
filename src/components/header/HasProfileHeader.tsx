import ProfileIcon from '@components/iconComponents/ProfileIcon';
import React from 'react';

interface HasProfileHeaderProps{
  title: string;
}

const HasProfileHeader: React.FC<HasProfileHeaderProps> = ({title}) => {
  return (
    <div
      className={`relative flex w-full p-0 h-[82px] justify-center items-center ${
        title === "띠로리" ? "bg-Primary" : "bg-Lime"
      }`}
    >
      <p className="text-center font-[400] text-[36px] text-[#000000] leading-[48.96px]">{title}</p>
      <div className="absolute right-4">
        <ProfileIcon />
      </div>
    </div>
  );
};

export default HasProfileHeader;
