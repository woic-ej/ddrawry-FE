import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type DiaryResponse = {
  date: string;
  nickname: string;
  title: string;
  weather: string;
  mood: string;
  story: string;
  bookmark: boolean;
  image?: string;
};

export type EditDiaryResponse = {
  temp_id: number;
};

const getDiary = async (diaryId: string) => {
  try {
    const { data }: { data: DiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${diaryId}?edit=false`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteDiary = async (diaryId: string) => {
  try {
    await api.delete({ endpoint: `${apiRoutes.diary}/${diaryId}` });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editDiary = async (diaryId: string) => {
  try {
    const { data }: { data: EditDiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${diaryId}?edit=true`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetDiary = (diaryId: string) => {
  return useQuery({
    queryKey: [`diary${diaryId}`],
    queryFn: () => getDiary(diaryId),
  });
};

export const useDeleteDiary = (diaryId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteDiary(diaryId),
    onSuccess: () => navigate(-1),
  });
};
