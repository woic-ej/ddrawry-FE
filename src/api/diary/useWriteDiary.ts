import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DiaryFormData } from "src/types/WriteDiaryTypes";

type WriteDiaryPayLoad = {
  date: string;
  nickname: string;
} & DiaryFormData;

type WriteDiaryResponse = {
  id: number;
};

const postDiary = async (diaryData: WriteDiaryPayLoad) => {
  try {
    const { data }: { data: WriteDiaryResponse } = await api.post({
      endpoint: apiRoutes.diary,
      body: diaryData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useWriteDiary = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (diaryData: WriteDiaryPayLoad) => postDiary(diaryData),
    onSuccess: (data) => {
      navigate(`/diary/${data.id}`);
    },
    onError: (error) => {
      console.log(error); // 에러메세지와 함께 에러페이지로 이동
    },
  });
};
