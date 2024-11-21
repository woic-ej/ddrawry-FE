import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { WriteDiaryPayLoad, WriteDiaryResponse } from "src/types/diaryTypes";

// 일기 작성
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
      localStorage.removeItem(`temp-diary/${data.temp_id}`);
      navigate(-1);

      setTimeout(() => {
        navigate(`/diary/${data.id}`, { replace: true });
      }, 10);
    },
  });
};
