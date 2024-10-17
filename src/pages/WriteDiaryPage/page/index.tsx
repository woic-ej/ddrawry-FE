import Diary from "@components/diary/Diary";
import DefaultHeader from "@components/header/DefaultHeader";
import WriteDiaryButtonSection from "@pages/WriteDiaryPage/components/WriteDiaryButtonSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryFormData, DiaryFormSchema } from "../../../types/WriteDiaryTypes";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTempDiary } from "@api/diary/useTempDiary";

const WriteDiaryPage = () => {
  const { date, tempId } = useParams<{ date: string; tempId: string }>();
  const methods = useForm<DiaryFormData>({
    resolver: zodResolver(DiaryFormSchema),
    mode: "onChange",
  });

  // 임시데이터를 조회해서 그 값으로 폼 데이터 reset
  useEffect(() => {
    (async () => {
      const data = await getTempDiary(tempId!);
      methods.reset(data);
      sessionStorage.setItem("temp-diary", JSON.stringify(data));
    })();
  }, [methods, tempId]);

  return (
    <div className="flex flex-col items-center">
      <DefaultHeader title="일기 쓰기" />
      <FormProvider {...methods}>
        <Diary date={date!} nickname={"팡팡이"} count={2} />
        <WriteDiaryButtonSection date={date!} nickname={"팡팡이"} />
      </FormProvider>
    </div>
  );
};

export default WriteDiaryPage;
