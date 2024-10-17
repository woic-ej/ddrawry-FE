import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";

type TempDiaryResponse = {
  nickname: string;
  title?: string;
  weather?: string;
  mood?: string;
  story?: string;
  image?: string;
};

export const getTempDiary = async (tempId: string): Promise<TempDiaryResponse> => {
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
