import React from "react";
import DiaryItem from "@components/diary/list/DiaryItem";

const DUMMY_IMG = "https://avatars.githubusercontent.com/u/77326820?v=4";

const DiaryList: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <DiaryItem
        imageUrl={DUMMY_IMG}
        title="신나는 산책을 했따."
        date={new Date()}
        likeStatus={1}
      />
      <DiaryItem imageUrl="" title="수영장갔다옴" date={new Date()} likeStatus={1} />
      <DiaryItem imageUrl={DUMMY_IMG} title="룰루랄라" date={new Date()} likeStatus={1} />
    </div>
  );
};

export default DiaryList;
