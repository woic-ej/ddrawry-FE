import { useGetShareDiary } from "@api/diary/useGetShareDiary";
import BigButton from "@components/buttons/BigButton";
import Diary from "@components/diary/Diary";
import LoadingSpinner from "@components/loading/LoadingSpinner";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { DiaryFormData } from "src/types/WriteDiaryTypes";

const SharedPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const methods = useForm<DiaryFormData>();
  const token = queryParams.get("token");
  const diaryId = Number(queryParams.get("id"));
  const { data: shareDiaryData, isLoading } = useGetShareDiary(diaryId, token);

  useEffect(() => {
    if (shareDiaryData) {
      methods.reset(shareDiaryData);
    }
  }, [methods, shareDiaryData]);

  const handleGoHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      {shareDiaryData && (
        <div className="flex flex-col items-center pb-[40px]">
          <FormProvider {...methods}>
            <Diary date={shareDiaryData?.date} nickname={shareDiaryData?.nickname} />
          </FormProvider>
          <div className="flex justify-end w-11/12 md:w-[600px] lg:w-[800px] mb-[2.5rem] md:mb-[50px]">
            <div className="w-4/6 max-w-[380px]">
              <BigButton
                title="띠로리와 나만의 일기를 작성하러 고고!"
                color="blue"
                onClick={handleGoHome}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedPage;
