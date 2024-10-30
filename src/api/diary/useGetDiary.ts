import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

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

export const useGetDiary = (dairyId: string) => {
  return useQuery({
    queryKey: [`diary/${dairyId}`],
    queryFn: () => getDiary(dairyId),
  });
};
