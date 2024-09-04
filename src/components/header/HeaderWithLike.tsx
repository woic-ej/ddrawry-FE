import LikeIcon from '@components/iconComponents/LikeIcon';
import React from 'react';

const HeaderWithLike: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 flex w-full p-0 h-[82px] justify-center items-center bg-Lemon">
        <p className="text-center font-[400] title-font leading-[48.96px]">일기장</p>
        <div className="absolute right-4">
          <LikeIcon status={0} />
        </div>
      </div>
      {/* 헤더 높이만큼의 공간 확보 */}
      <div className="h-[82px]" />
    </>
  );
};

export default HeaderWithLike;
