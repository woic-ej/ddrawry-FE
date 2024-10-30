import Diary from "@components/diary/Diary";
import HeaderWithLike from "@components/header/HeaderWithLike";
import React, { useEffect, useState } from "react";
import DiaryButtonSection from "@pages/DiaryPage/components/DiaryButtonSection";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetDiary } from "@api/diary/useDiary";

const DiaryPage: React.FC = () => {
  const methods = useForm<DiaryFormData>();
  const { date, diaryId } = useParams<{ date: string; diaryId: string }>();
  const [nickname, setNickname] = useState<string>("");
  const { data: diaryData, isError } = useGetDiary(diaryId!);

  useEffect(() => {
    sessionStorage.removeItem("initialLoad");
  }, []);

  useEffect(() => {
    if (diaryData) {
      methods.reset(diaryData);
      setNickname(diaryData.nickname);
    }
  }, [methods, diaryData]);

  if (isError) return <div>에러발생</div>;

  return (
    <div className="flex flex-col items-center">
      {diaryData && <HeaderWithLike bookmark={diaryData.bookmark} id={Number(diaryId!)} />}
      <FormProvider {...methods}>
        <Diary date={date!} nickname={nickname} />
      </FormProvider>
      <DiaryButtonSection diaryId={diaryId!} />
    </div>
  );
};

export default DiaryPage;
