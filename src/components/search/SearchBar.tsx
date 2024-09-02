import React from "react";
import SearchInput from "@components/search/SearchInput";
import SearchIcon from "@components/search/SearchIcon";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center gap-[18px]">
      <SearchInput />
      <SearchIcon />
    </div>
  );
};

export default SearchBar;
