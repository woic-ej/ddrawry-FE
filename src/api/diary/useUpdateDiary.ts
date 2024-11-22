import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { WriteDiaryPayLoad, WriteDiaryResponse } from "src/types/diaryTypes";

// 일기 수정
const updateDiary = async (diaryId: string, diaryData: WriteDiaryPayLoad) => {
  try {
    const { data }: { data: WriteDiaryResponse } = await api.put({
      endpoint: `${apiRoutes.diary}/${diaryId}`,
      body: diaryData,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useUpdateDiary = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ diaryId, diaryData }: { diaryId: string; diaryData: WriteDiaryPayLoad }) =>
      updateDiary(diaryId, diaryData),
    onSuccess: (data) => {
      navigate(-2);
      localStorage.removeItem(`temp-diary/${data.temp_id}`);
      queryClient.invalidateQueries({ queryKey: [`diary${data.id}`] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "likedDiaries",
      });
    },
  });
};
