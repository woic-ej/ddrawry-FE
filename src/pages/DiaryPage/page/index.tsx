import Diary from "@components/diary/Diary";
import HeaderWithLike from "@components/header/HeaderWithLike";
import React, { useEffect } from "react";
import DiaryButtonSection from "@pages/DiaryPage/components/DiaryButtonSection";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetDiary } from "@api/diary/useGetDiary";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const DiaryPage: React.FC = () => {
  const methods = useForm<DiaryFormData>();
  const { diaryId } = useParams<{ diaryId: string }>();
  const { data: diaryData, isLoading } = useGetDiary(diaryId!);

  useEffect(() => {
    sessionStorage.removeItem("initialLoad");
  }, []);

  useEffect(() => {
    if (diaryData) {
      methods.reset(diaryData);
    }
  }, [methods, diaryData]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {diaryData && (
        <>
          <HeaderWithLike bookmark={diaryData.bookmark} id={Number(diaryId!)} />
          <FormProvider {...methods}>
            <Diary date={diaryData.date} nickname={diaryData.nickname} />
          </FormProvider>
          <DiaryButtonSection date={diaryData.date} diaryId={diaryId!} />
        </>
      )}
    </div>
  );
};

export default DiaryPage;
