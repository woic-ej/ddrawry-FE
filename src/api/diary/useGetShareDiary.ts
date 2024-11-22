import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { GetDiaryResponse } from "./useGetDiary";
import { useQuery } from "@tanstack/react-query";

type IPostShareDiaryType = {
  token: string;
};

type IPostShareDiaryErrorType = {
  detail: string;
}

export const postShareDiary = async (diaryId: number) => {
  try {
    const { data }: { data: IPostShareDiaryType } = await api.post({
      endpoint: `${apiRoutes.sharedDiary}/${diaryId}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getShareDiary = async (diaryId: number | null, token: string | null) => {
  try {
    const { data }: { data: GetDiaryResponse } = await api.get({
      endpoint: `${apiRoutes.sharedDiary}/${diaryId}?token=${token}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetShareDiary = (diaryId: number | null, token: string | null) => {
  return useQuery<GetDiaryResponse, IPostShareDiaryErrorType>({
    queryKey: ["SHARE_DIARY"],
    queryFn: () => getShareDiary(diaryId, token),
  });
}
