import api from "@api/fetcher";
import { apiRoutes } from "@api/apiRoutes";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { DiaryListType } from "src/types/diaryTypes";

const fetchLikedDiaries = async (
  isTotalView: boolean,
  currentDate: Date,
): Promise<DiaryListType[]> => {
  const query = isTotalView ? "all" : `month&date=${format(currentDate, "yyyyMM")}`;
  try {
    const { data }: { data: DiaryListType[] } = await api.get({
      endpoint: `${apiRoutes.likeDiary}?type=${query}`,
    });
    return data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const useLikedDiaries = (isTotalView: boolean, currentDate: Date) => {
  return useQuery<DiaryListType[]>({
    queryKey: ["likedDiaries", isTotalView, currentDate],
    queryFn: () => fetchLikedDiaries(isTotalView, currentDate),
  });
};
