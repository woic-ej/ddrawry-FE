import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

type TempDiaryResponse = {
  nickname: string;
  title?: string;
  weather?: string;
  mood?: string;
  story?: string;
  image?: string;
};

const getTempDiary = async (tempId: string): Promise<TempDiaryResponse> => {
  try {
    const { data }: { data: TempDiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${tempId}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetTempDiary = (tempId: string) => {
  return useQuery<TempDiaryResponse>({
    queryKey: [`tempDiary/${tempId}`],
    queryFn: () => getTempDiary(tempId),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
