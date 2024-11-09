import Diary from "@components/diary/Diary";
import DefaultHeader from "@components/header/DefaultHeader";
import WriteDiaryButtonSection from "@pages/WriteDiaryPage/components/WriteDiaryButtonSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryFormData, DiaryFormSchema } from "../../../types/WriteDiaryTypes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTempDiary } from "@api/tempDiary/tempApis";
import TempSaveModal from "@pages/WriteDiaryPage/components/TempSaveModal";
import { TempDiaryType } from "src/types/tempTypes";

const WriteDiaryPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tempData, setTempData] = useState<TempDiaryType | null>(null);
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
      setTempData(data);
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

  return (
    <div className="flex flex-col items-center">
      <DefaultHeader title="일기 쓰기" />
      {isLoading || !tempData ? (
        <div>loading...</div>
      ) : (
        <>
          <FormProvider {...methods}>
            <Diary
              date={tempData.date}
              nickname={tempData.nickname}
              count={tempData.remaining_count}
              isFull={Boolean(tempData.image_count === 3)}
            />
            <WriteDiaryButtonSection
              date={tempData.date}
              nickname={tempData.nickname}
              tempId={tempId!}
            />
          </FormProvider>
          <TempSaveModal date={tempData.date} tempId={tempId!} />
        </>
      )}
    </div>
  );
};

export default WriteDiaryPage;
