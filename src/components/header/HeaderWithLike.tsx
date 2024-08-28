import LikeIcon from '@components/iconComponents/LikeIcon';
import React from 'react';

const HeaderWithLike: React.FC = () => {
  return (
    <div className="relative flex w-full p-0 h-[82px] justify-center items-center bg-Lemon">
      <p className="text-center font-[400] text-[36px] text-[#000000] leading-[48.96px]">일기장</p>
      <div className="absolute right-4">
        <LikeIcon status={0} />
      </div>
    </div>
  );
};

export default HeaderWithLike;
