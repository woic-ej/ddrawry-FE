import React from "react";

const SearchInput: React.FC = () => {
  return (
    <div className="w-[1015px] h-[70px] rounded-[10px] border border-Gray flex items-center">
      <input
        type="text"
        className="w-[900px] placeholder-Gray text-regular ml-[24px] focus:outline-none"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default SearchInput;
