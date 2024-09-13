import Diary from "@components/diary/Diary";
import HeaderWithLike from "@components/header/HeaderWithLike";
import useDiaryStore from "@store/diaryStore";
import useImageStore from "@store/imageStore";
import React, { useEffect } from "react";
import { DiaryDataType } from "src/types/diaryTypes";
import ButtonSection from "@pages/DiaryPage/components/ButtonSection";

const DiaryPage: React.FC = () => {
  const { setMood, setWeather, setTitle, setContent } = useDiaryStore();
  const { setImage } = useImageStore();
  const diaryData: DiaryDataType = {
    id: 1,
    date: "2024-08-13",
    nickname: "팡팡이",
    mood: "smile",
    weather: "sunny",
    title: "신나는 산책을 했따",
    image: null,
    story:
      "아침에 쿨쿨자고 일어나서 밥 먹고 응가하고 엄마랑 놀았따. 그러고 밥 먹고 낮잠을 자고 또 아빠랑 놀았따. 점심을 먹고 소화 시킬겸 언니랑 산책을 나갔다. 여기저기 신기한 냄새들을 잔뜩 맡았따. 완전 신나는 하루였따",
  };

  useEffect(() => {
    const diarySetting = () => {
      setMood(diaryData.mood);
      setWeather(diaryData.weather);
      setTitle(diaryData.title);
      setContent(diaryData.story);
      setImage(diaryData.image);
    };
    diarySetting();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <HeaderWithLike />
      <Diary
        date={diaryData.date}
        name={diaryData.nickname}
        count={diaryData.count}
        isFull={diaryData.isFull}
      />
      <ButtonSection />
    </div>
  );
};

export default DiaryPage;
