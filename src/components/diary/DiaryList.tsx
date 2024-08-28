import React from "react";
import DiaryItem from "@components/diary/DiaryItem";

const DUMMY_IMG = "https://avatars.githubusercontent.com/u/77326820?v=4";

const DiaryList: React.FC = () => {
  return (
    <div className="flex flex-col">
      <DiaryItem imageUrl={DUMMY_IMG} />
      <DiaryItem imageUrl="" />
      <DiaryItem imageUrl={DUMMY_IMG} />
    </div>
  );
};

export default DiaryList;
