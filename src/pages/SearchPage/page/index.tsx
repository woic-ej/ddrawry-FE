import { useSearchDiary } from "@api/diary/useSearchDiary";
import HeaderWithProfile from "@components/header/HeaderWithProfile";
import SearchBar from "@components/search/SearchBar";
import React, { useState } from "react";
import SearchDiaryView from "@pages/SearchPage/components/SearchDiaryView";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const SearchPage = () => {
  const [value, setValue] = useState<string>("");
  const { data, refetch, isLoading } = useSearchDiary(value);
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    queryClient.removeQueries({ queryKey: ["searchDiary"] });
  };

  const handleSearchClick = () => {
    if (value) {
      refetch();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <HeaderWithProfile title="일기 검색하기" />
      <div className="flex flex-col w-11/12 flex-grow md:w-4/5 pt-[2.5rem]">
        <SearchBar
          content={value}
          handleInputChange={handleInputChange}
          handleClick={handleSearchClick}
        />
        {isLoading ? <LoadingSpinner /> : <SearchDiaryView value={value} data={data} />}{" "}
      </div>
    </div>
  );
};

export default SearchPage;
