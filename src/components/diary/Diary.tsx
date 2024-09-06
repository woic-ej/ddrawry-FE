import MoodList from "@components/iconComponents/mood/MoodList";
import WeatherList from "@components/iconComponents/weather/WeatherList";
import React, { useCallback, useState } from "react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";
import InputSection from "./InputSection";

interface Props {
  date: string;
  name: string;
  count: number;
  isFull: boolean;
}

const Diary: React.FC<Props> = ({ date, name, count, isFull }) => {
  const numRows = 10;
  const numCols = 20;
  const [gridValues, setGridValues] = useState(Array(numRows * numCols).fill(""));
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const isEmptyGrid = gridValues.every((value) => value === "");

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newGridValues = [...gridValues];
      newGridValues[index] = value;
      setGridValues(newGridValues);
    }
  };

  const countTotalCharacters = useCallback(() => {
    return gridValues.reduce((total, value) => total + value.length, 0);
  }, [gridValues]);

  return (
    <div className="w-[1150px] h-[1530px] border-[3px] border-Charcoal flex flex-col">
      <div className="flex justify-center items-center py-[12px] title-font border-b-[3px] border-Charcoal ">
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
          isValidate={countTotalCharacters() > 120}
        />
      </div>
      <div className={`w-full flex flex-grow ${!isClicked && " justify-center items-center"}`}>
        {isEmptyGrid && !isClicked ? (
          <div
            className="hugeCaption-font text-center cursor-pointer"
            onClick={() => {
              setIsClicked(true);
            }}
          >
            띠로리가 멋진 그림을 만들기위해서는 <br />
            최소 120자는 써야 해요!
          </div>
        ) : (
          <InputSection
            numCols={numCols}
            numRows={numRows}
            handleInputChange={handleInputChange}
            gridValues={gridValues}
            contentLength={countTotalCharacters()}
          />
        )}
      </div>
    </div>
  );
};

export default Diary;
