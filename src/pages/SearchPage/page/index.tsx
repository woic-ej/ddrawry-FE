import DiaryList from "@components/diary/list/DiaryList";
import EmptyState from "@components/empty/EmptyState";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import SearchBar from "@components/search/SearchBar";
import React, { useState } from "react";

const results = [
  {
    id: 1,
    date: "2024-08-13",
    title: "신나는 게임을 했따",
    image: "",
    bookmark: true,
  },
  {
    id: 3,
    date: "2024-08-20",
    title: "학교 가기 싫다",
    image: "",
    bookmark: false,
  },
];

const SearchPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (value === "") {
      results.length = 0;
    }
    if (isSearchClicked) setIsSearchClicked(false);
  };

  const handleSearchClick = () => {
    if (!value) {
      return;
    }
    results.length = 2;
    setIsSearchClicked(true);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <HeaderWithProfile title="일기 검색하기" />
      <div className="mt-[50px] flex justify-center">
        <SearchBar
          content={value}
          handleInputChange={handleInputChange}
          handleClick={handleSearchClick}
        />
      </div>

      {!value || results.length === 0 ? (
        <div className="flex flex-grow justify-center items-center">
          <EmptyState message="검색된 결과가 없어요!" />
        </div>
      ) : (
        results.length > 0 && (
          <div className="w-full flex justify-center items-center mt-[60px]">
            <div>
              <DiaryList diaries={[]} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchPage;
