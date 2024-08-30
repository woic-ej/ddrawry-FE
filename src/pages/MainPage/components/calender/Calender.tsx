import React from "react";
import CalenderItem from "@pages/MainPage/components/calender/CalenderItem";

const DUMMY_IMG = "https://avatars.githubusercontent.com/u/77326820?v=4";
const Calender: React.FC = () => {
  return (
    <div>
      <CalenderItem date={1} likeStatus={1} />
      <CalenderItem date={2} likeStatus={1} imageUrl={DUMMY_IMG} />
      <CalenderItem date={3} />
    </div>
  );
};

export default Calender;
