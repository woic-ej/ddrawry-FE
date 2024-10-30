import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type DiaryResponse = {
  nickname: string;
  title: string;
  weather: string;
  mood: string;
  story: string;
  image?: string;
};

const getDiary = async (dairyId: string) => {
  try {
    const { data }: { data: DiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${dairyId}?edit=false`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteDiary = async (diaryId: string) => {
  try {
    await api.delete({ endpoint: `${apiRoutes.diary}/${diaryId}` });
  } catch (error) {
    console.error(error);
  }
};

export const useGetDiary = (dairyId: string) => {
  return useQuery({
    queryKey: [`diary/${dairyId}`],
    queryFn: () => getDiary(dairyId),
  });
};

export const useDeleteDiary = (diaryId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteDiary(diaryId),
    onSuccess: () => navigate(-1),
  });
};
