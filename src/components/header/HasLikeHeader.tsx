import Liked from '@components/diary/Liked';
import React from 'react';

const HasLikeHeader: React.FC = () => {
  return (
    <div className="relative flex w-full p-0 h-[82px] justify-center items-center bg-Lemon">
      <p className="text-center font-[400] text-[36px] text-[#000000] leading-[48.96px]">일기장</p>
      <div className="absolute right-4">
        <Liked />
      </div>
    </div>
  );
};

export default HasLikeHeader;
