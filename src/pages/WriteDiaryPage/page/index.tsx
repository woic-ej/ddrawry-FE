import Diary from "@components/diary/Diary";
import React from "react";

const WriteDiaryPage: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Diary date="2024년 8월 10일" name="최은진" count={3} isFull={false} />
    </div>
  );
};

export default WriteDiaryPage;
