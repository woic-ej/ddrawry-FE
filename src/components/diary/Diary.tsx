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
  count?: number;
  isFull?: boolean;
}

const LIMIT_LENGTH = 150;
const MAX_LENGTH = 240;

const Diary: React.FC<Props> = ({ date, nickname, count, isFull }) => {
  const location = useLocation();
  const isDiaryPage = location.pathname.includes("diary");
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<DiaryFormData>();

  const currentMood = watch("mood");
  const currentWeather = watch("weather");
  const currentStory = watch("story");
  const currentImage = watch("image");

  return (
    <form>
      <div className="w-[1150px] h-[1600px] border-[3px] border-Charcoal flex flex-col mt-[85px] mb-[50px]">
        <div className="w-full flex justify-center items-center py-[12px] title-font border-b-[3px] border-Charcoal ">
          {format(parseISO(date), "yyyy년 MM월 dd일")} {nickname}의 일기
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
        <div className="w-full h-[75px] border-b-[3px] border-Charcoal pl-[70px] flex items-center">
          <div className="title-font">제목 : </div>
          <input
            className="ml-[18px] w-[700px] h-[45px] focus:outline-none title-font placeholder-Gray"
            type="text"
            placeholder="제목을 입력해주세요."
            readOnly={isDiaryPage}
            maxLength={14}
            {...register("title")}
          />
        </div>
        <div className="flex items-center justify-center w-full h-[648px] border-b-[3px] border-Charcoal">
          {currentImage ? (
            <img src={currentImage} className="w-full h-full" />
          ) : isDiaryPage ? (
            <DefaultDiaryLogo />
          ) : (
            <ImageCreationPanel
              count={count!}
              isFull={isFull!}
              isValidate={!errors.story && !!currentStory}
              setValue={setValue}
            />
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
