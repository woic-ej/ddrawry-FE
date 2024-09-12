import MoodList from "@components/iconComponents/mood/MoodList";
import WeatherList from "@components/iconComponents/weather/WeatherList";
import React, { useState } from "react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";
import InputSection from "@components/diary/InputSection";
import useImageStore from "@store/imageStore";

interface Props {
  date: string;
  name: string;
  count: number;
  isFull: boolean;
}

const MAXIMUM_WORD = 250;
const WORD_LIMIT = 150;

const Diary: React.FC<Props> = ({ date, name, count, isFull }) => {
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const { image } = useImageStore();

  const handleInputChange = (value: string) => {
    if (value.length <= MAXIMUM_WORD) setContent(value);
  };

  return (
    <div className="w-[1150px] h-[1600px] border-[3px] border-Charcoal flex flex-col mt-[85px] mb-[50px]">
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
        {image ? (
          <img src={image} className="w-full h-full" />
        ) : (
          <ImageCreationPanel
            count={count}
            isFull={isFull}
            isValidate={content.length > WORD_LIMIT}
          />
        )}
      </div>
      <InputSection
        content={content}
        wordLimit={WORD_LIMIT}
        maxLength={MAXIMUM_WORD}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Diary;
