import React from "react";

interface SearchInputProps {
  content: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ content, handleInputChange, handleClick }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="w-full h-[40px] md:h-[50px] rounded-[10px] border border-Gray flex items-center">
      <input
        type="text"
        className="w-full placeholder-Gray text-regular ml-[24px] focus:outline-none"
        placeholder="검색어를 입력하세요"
        value={content}
        onKeyDown={handleKeyDown}
        onChange={(value) => handleInputChange(value)}
      />
    </div>
  );
};

export default SearchInput;
