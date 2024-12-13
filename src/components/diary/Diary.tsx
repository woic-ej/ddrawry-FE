import MoodList from "@components/iconComponents/mood/MoodList";
import WeatherList from "@components/iconComponents/weather/WeatherList";
import React from "react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";
import InputSection from "@components/diary/InputSection";
import { useLocation } from "react-router-dom";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import DisplaySection from "@components/diary/DisplaySection";
import { format, parseISO } from "date-fns";
import { useFormContext } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";

interface Props {
  date: string;
  nickname: string;
}

const LIMIT_LENGTH = 100;
const MAX_LENGTH = 240;

const Diary: React.FC<Props> = ({ date, nickname }) => {
  const formattedDate = date ? format(parseISO(date), "yyyy년 MM월 dd일") : "";
  const location = useLocation();
  const isDiaryPage = location.pathname.includes("diary") || location.pathname.includes("share");
  const { register, setValue, trigger, watch } = useFormContext<DiaryFormData>();

  const currentMood = watch("mood");
  const currentWeather = watch("weather");
  const currentStory = watch("story");
  const currentImage = watch("image");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[800px] h-[1250px] border-[3px] border-Charcoal flex flex-col mt-[50px] mb-[50px]">
        <div className="w-full flex justify-center items-center py-[12px] title-font border-b-[3px] border-Charcoal">
          {formattedDate} {nickname}의 일기
        </div>
        <div className="flex w-full border-b-[3px] border-Charcoal">
          <div className="option-box border-r-[3px] border-Charcoal">
            <div className="title-font">기분 : </div>
            <MoodList
              setValue={setValue}
              trigger={trigger}
              currentMood={currentMood}
              disabled={isDiaryPage}
            />
          </div>
          <div className="option-box">
            <div className="title-font">날씨 : </div>
            <WeatherList
              setValue={setValue}
              trigger={trigger}
              currentWeather={currentWeather}
              disabled={isDiaryPage}
            />
          </div>
        </div>
        <div className="w-full h-[75px] border-b-[3px] border-Charcoal pl-[25px] flex items-center">
          <div className="title-font">제목 : </div>
          <input
            className="ml-[18px] w-4/5 h-[45px] focus:outline-none title-font placeholder-Gray"
            type="text"
            placeholder="제목을 입력해주세요."
            readOnly={isDiaryPage}
            maxLength={15}
            {...register("title")}
          />
        </div>
        <div className="flex items-center justify-center w-full h-auto border-b-[3px] border-Charcoal">
          {currentImage ? (
            <img
              src={currentImage}
              width={530}
              height={530}
              alt="그림일기 이미지"
              className="w-2/3 aspect-square"
            />
          ) : isDiaryPage ? (
            <div className="w-2/3 aspect-square flex items-center justify-center">
              <DefaultDiaryLogo />
            </div>
          ) : (
            <ImageCreationPanel date={date} story={currentStory} setValue={setValue} />
          )}
        </div>
        {isDiaryPage ? (
          <DisplaySection content={currentStory} />
        ) : (
          <InputSection
            wordLimit={LIMIT_LENGTH}
            maxLength={MAX_LENGTH}
            register={register}
            currentStory={currentStory}
          />
        )}
      </div>
    </form>
  );
};

export default Diary;
