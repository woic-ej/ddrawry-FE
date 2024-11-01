import Diary from "@components/diary/Diary";
import DefaultHeader from "@components/header/DefaultHeader";
import WriteDiaryButtonSection from "@pages/WriteDiaryPage/components/WriteDiaryButtonSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryFormData, DiaryFormSchema } from "../../../types/WriteDiaryTypes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTempDiary } from "@api/diary/useTempDiary";
import TempSaveModal from "@pages/WriteDiaryPage/components/TempSaveModal";

const WriteDiaryPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const { tempId } = useParams<{ tempId: string }>();
  const methods = useForm<DiaryFormData>({
    resolver: zodResolver(DiaryFormSchema),
    mode: "onChange",
  });

  // 임시데이터를 조회해서 그 값으로 폼 데이터 reset
  useEffect(() => {
    (async () => {
      let data = await getTempDiary(tempId!);
      const storageTemp = localStorage.getItem(`temp-diary/${tempId}`);
      if (!storageTemp) {
        localStorage.setItem(`temp-diary/${tempId}`, JSON.stringify(data));
      } else {
        data = JSON.parse(storageTemp);
      }
      setNickname(data.nickname);
      setDate(data.date);
      methods.reset(data);
      methods.trigger();
    })();
    setIsLoading(false);
  }, [methods, tempId]);

  // 폼 데이터가 변경 될 때 마다 로컬 스토리지에 저장
  useEffect(() => {
    const subscription = methods.watch((liveTemp) => {
      localStorage.setItem(`temp-diary/${tempId}`, JSON.stringify(liveTemp));
    });

    return () => subscription.unsubscribe();
  }, [methods, tempId]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!isLoading) {
    return (
      <div className="flex flex-col items-center">
        <DefaultHeader title="일기 쓰기" />
        <FormProvider {...methods}>
          <Diary date={date} nickname={nickname} count={2} />
          <WriteDiaryButtonSection date={date} nickname={nickname} />
        </FormProvider>
        <TempSaveModal date={date} tempId={tempId!} />
      </div>
    );
  }
};

export default WriteDiaryPage;
