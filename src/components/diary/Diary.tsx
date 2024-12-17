import MoodList from "@components/diary/mood/MoodList";
import WeatherList from "@components/diary/weather/WeatherList";
import React, { useEffect, useState } from "react";
import ImageCreationPanel from "@components/diary/image/ImageCreationPanel";
import InputSection from "@components/diary/InputSection";
import { useLocation } from "react-router-dom";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import DisplaySection from "@components/diary/DisplaySection";
import { format, parseISO } from "date-fns";
import { useFormContext } from "react-hook-form";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { LIMIT_LENGTH, MAX_LENGTH } from "@constants/wordLength";

interface Props {
  date: string;
  nickname: string;
}

const Diary: React.FC<Props> = ({ date, nickname }) => {
  const formattedDate = date ? format(parseISO(date), "yyyy년 MM월 dd일") : "";
  const location = useLocation();
  const isDiaryPage = location.pathname.includes("diary") || location.pathname.includes("share");
  const { register, setValue, trigger, watch } = useFormContext<DiaryFormData>();
  const [isSelectOption, setIsSelectOption] = useState<boolean>(false);

  const currentMood = watch("mood");
  const currentWeather = watch("weather");
  const currentStory = watch("story");
  const currentImage = watch("image");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const ChangeSelectOption = () => {
      const width = window.innerWidth;
      setIsSelectOption(width <= 530);
    };

    ChangeSelectOption();
    window.addEventListener("resize", ChangeSelectOption);

    return () => window.removeEventListener("resize", ChangeSelectOption);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full">
      <div className="w-11/12 h-auto md:w-[600px] lg:w-[800px] border-[3px] border-Charcoal flex flex-col my-[2.5rem] md:my-[50px]">
        <div className="w-full flex justify-center items-center py-[8px] md:py-[12px] title-font border-b-[3px] border-Charcoal">
          {formattedDate} {nickname}의 일기
        </div>
        <div className="flex w-full border-b-[3px] border-Charcoal">
          <div className="option-box border-r-[3px] border-Charcoal">
            <div className="title-font ">기분 : </div>
            <MoodList
              setValue={setValue}
              trigger={trigger}
              currentMood={currentMood}
              isDiaryPage={isDiaryPage}
              isSelectOption={isSelectOption}
            />
          </div>
          <div className="option-box">
            <div className="title-font">날씨 : </div>
            <WeatherList
              setValue={setValue}
              trigger={trigger}
              currentWeather={currentWeather}
              isDiaryPage={isDiaryPage}
              isSelectOption={isSelectOption}
            />
          </div>
        </div>
        <div className="w-full h-[40px] md:h-[45px] lg:h-[60px] border-b-[3px] border-Charcoal pl-[10px] flex items-center">
          <div className="title-font">제목 : </div>
          <input
            className="ml-[18px] w-4/5 h-full focus:outline-none title-font placeholder-Gray"
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
