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
    <div className="min-w-[1015px] max-w-[1067px] h-[70px] rounded-[10px] border border-Gray flex items-center">
      <input
        type="text"
        className="min-w-[900px] max-w-[1013px] placeholder-Gray text-regular ml-[24px] focus:outline-none"
        placeholder="검색어를 입력하세요"
        value={content}
        onKeyDown={handleKeyDown}
        onChange={(value) => handleInputChange(value)}
      />
    </div>
  );
};

export default SearchInput;
