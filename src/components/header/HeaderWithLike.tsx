import LikeIcon from '@components/iconComponents/LikeIcon';
import React from 'react';

const HeaderWithLike: React.FC = () => {
  return (
    <div className="z-[50] sticky top-0 flex w-full p-0 min-h-[82px] justify-center items-center bg-Lemon">
      <p className="text-center title-font leading-[48.96px]">일기장</p>
      <div className="absolute right-4">
        <LikeIcon status={0} />
      </div>
    </div>
  );
};

export default HeaderWithLike;
