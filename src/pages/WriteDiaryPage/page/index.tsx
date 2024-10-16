import Diary from "@components/diary/Diary";
import DefaultHeader from "@components/header/DefaultHeader";
import WriteDiaryButtonSection from "@pages/WriteDiaryPage/components/WriteDiaryButtonSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryFormData, DiaryFormSchema } from "../../../types/WriteDiaryTypes";
import { useParams } from "react-router-dom";

const WriteDiaryPage = () => {
  const { date } = useParams<{ date: string }>();
  const methods = useForm<DiaryFormData>({
    resolver: zodResolver(DiaryFormSchema),
    mode: "onChange",
  });

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
