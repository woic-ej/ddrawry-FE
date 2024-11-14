import Diary from "@components/diary/Diary";
import HeaderWithLike from "@components/header/HeaderWithLike";
import React, { useEffect, useRef } from "react";
import DiaryButtonSection from "@pages/DiaryPage/components/DiaryButtonSection";
import { DiaryFormData } from "src/types/WriteDiaryTypes";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetDiary } from "@api/diary/useGetDiary";

const DiaryPage: React.FC = () => {
  const methods = useForm<DiaryFormData>();
  const { diaryId } = useParams<{ diaryId: string }>();
  const { data: diaryData, isError } = useGetDiary(diaryId!);
  const diaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.removeItem("initialLoad");
  }, []);

  useEffect(() => {
    if (diaryData) {
      methods.reset(diaryData);
    }
  }, [methods, diaryData]);

  if (isError) return <div>에러발생</div>;

  return (
    <div className="flex flex-col items-center">
      {diaryData && (
        <>
          <HeaderWithLike bookmark={diaryData.bookmark} id={Number(diaryId!)} />
          <FormProvider {...methods}>
            <Diary date={diaryData.date} nickname={diaryData.nickname} diaryRef={diaryRef} />
          </FormProvider>
          <DiaryButtonSection date={diaryData.date} diaryId={diaryId!} diaryRef={diaryRef} />
        </>
      )}
    </div>
  );
};

export default DiaryPage;
