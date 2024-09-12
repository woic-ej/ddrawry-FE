import React from "react";
import SearchInput from "@components/search/SearchInput";
import SearchIcon from "@components/search/SearchIcon";

interface SearchBarProps {
  content: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ content, handleInputChange, handleClick }) => {
  return (
    <div className="flex items-center gap-[18px]">
      <SearchInput content={content} handleInputChange={handleInputChange}handleClick={handleClick}/>
      <SearchIcon handleClick={handleClick} />
    </div>
  );
};

export default SearchBar;
