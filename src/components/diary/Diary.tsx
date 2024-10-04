import MoodList from "@components/iconComponents/mood/MoodList";
import WeatherList from "@components/iconComponents/weather/WeatherList";
import React from "react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";
import InputSection from "@components/diary/InputSection";
import useImageStore from "@store/imageStore";
import useDiaryStore from "@store/diaryStore";
import { useLocation } from "react-router-dom";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import DisplaySection from "@components/diary/DisplaySection";
import { format, parseISO } from "date-fns";

interface Props {
  date: string;
  name: string;
  count?: number;
  isFull?: boolean;
}

const Diary: React.FC<Props> = ({ date, name, count, isFull }) => {
  const location = useLocation();
  const { mood, weather, title, setTitle, content, setContent, limitLength, maxLength } =
    useDiaryStore();
  const { image } = useImageStore();
  const isValidate = !!(mood && weather && title && content.length >= limitLength);
  const isDiaryPage = location.pathname.includes("diary");

  const handleTitleChange = (value: string) => {
    if (title.length <= 15) setTitle(value);
  };

  const handleInputChange = (value: string) => {
    if (value.length <= maxLength) setContent(value);
  };

  return (
    <div className="w-[1150px] h-[1600px] border-[3px] border-Charcoal flex flex-col mt-[85px] mb-[50px]">
      <div className="w-full flex justify-center items-center py-[12px] title-font border-b-[3px] border-Charcoal ">
        {format(parseISO(date), "yyyy년 MM월 dd일")} {name}의 일기
      </div>
      <div className="flex w-full border-b-[3px] border-Charcoal">
        <div className="option-box border-r-[3px] border-Charcoal">
          <div className="title-font">기분 : </div>
          <MoodList disabled={isDiaryPage} />
        </div>
        <div className="option-box">
          <div className="title-font">날씨 : </div>
          <WeatherList disabled={isDiaryPage} />
        </div>
      </div>
      <div className="w-full h-[75px] border-b-[3px] border-Charcoal pl-[70px] flex items-center">
        <div className="title-font">제목 : </div>
        <input
          className="ml-[18px] w-[700px] h-[45px] focus:outline-none title-font placeholder-Gray"
          type="text"
          value={title}
          placeholder="제목을 입력해주세요."
          onChange={(e) => handleTitleChange(e.target.value)}
          readOnly={isDiaryPage}
        />
      </div>
      <div className="flex items-center justify-center w-full h-[648px] border-b-[3px] border-Charcoal">
        {image ? (
          <img src={image} className="w-full h-full" />
        ) : isDiaryPage ? (
          <DefaultDiaryLogo />
        ) : (
          <ImageCreationPanel count={count!} isFull={isFull!} isValidate={isValidate} />
        )}
      </div>
      {isDiaryPage ? (
        <DisplaySection content={content} />
      ) : (
        <InputSection
          content={content}
          wordLimit={limitLength}
          maxLength={maxLength}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Diary;
