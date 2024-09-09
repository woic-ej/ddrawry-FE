import MoodList from "@components/iconComponents/mood/MoodList";
import WeatherList from "@components/iconComponents/weather/WeatherList";
import React, { useState } from "react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";
import InputSection from "./InputSection";
import { useCursorIndex } from "./../../store/CursorIndex";

interface Props {
  date: string;
  name: string;
  count: number;
  isFull: boolean;
}

const WORD_LIMIT = 150;

const Diary: React.FC<Props> = ({ date, name, count, isFull }) => {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { cursorIndex, setCursorIndex } = useCursorIndex();

  const handleInputChange = (value: string) => {
    if (cursorIndex === value.length - 1) {
      setCursorIndex(cursorIndex + 1);
    }
    setContent(value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (cursorIndex) {
      if (event.key === "Backspace") setCursorIndex(cursorIndex - 2);
    }
  };

  return (
    <div className="w-[1150px] h-[1600px] border-[3px] border-Charcoal flex flex-col">
      <div className="w-full flex justify-center items-center py-[12px] title-font border-b-[3px] border-Charcoal ">
        {date} {name}의 일기
      </div>
      <div className="flex w-full border-b-[3px] border-Charcoal">
        <div className="option-box border-r-[3px] border-Charcoal">
          <div className="title-font">기분 : </div>
          <MoodList selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
        </div>
        <div className="option-box">
          <div className="title-font">날씨 : </div>
          <WeatherList selectedWeather={selectedWeather} setSelectedWeather={setSelectedWeather} />
        </div>
      </div>
      <div className="w-full h-[75px] border-b-[3px] border-Charcoal pl-[70px] flex items-center">
        <div className="title-font">제목 : </div>
        <input
          className="ml-[18px] w-[700px] h-[45px] focus:outline-none title-font placeholder-Gray"
          type="text"
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div className="flex items-center justify-center w-full h-[648px] border-b-[3px] border-Charcoal">
        <ImageCreationPanel
          count={count}
          isFull={isFull}
          isValidate={content.length > WORD_LIMIT}
        />
      </div>
      <div
        className={`w-full flex flex-grow ${!isClicked && " justify-center items-center cursor-pointer"}`}
        onClick={() => {
          setIsClicked(true);
        }}
      >
        {content.length === 0 && !isClicked ? (
          <div className="hugeCaption-font text-center">
            띠로리가 멋진 그림을 만들기위해서는 <br />
            최소 120자는 써야 해요!
          </div>
        ) : (
          <InputSection
            handleInputChange={handleInputChange}
            handleOnKeyDown={handleOnKeyDown}
            content={content}
          />
        )}
      </div>
    </div>
  );
};

export default Diary;
