import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { DiaryListType } from "src/types/diaryTypes";

const searchDiary = async (keyword: string) => {
  try {
    const { data }: { data: DiaryListType[] } = await api.get({
      endpoint: `${apiRoutes.searchDiary}?keyword=${keyword}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useSearchDiary = (keyword: string) => {
  return useQuery({
    queryKey: ["searchDiary"],
    queryFn: () => searchDiary(keyword),
    enabled: false,
  });
};
