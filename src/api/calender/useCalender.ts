import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { BaseDiaryType } from "src/types/diaryTypes";

type IGetMainDiariesType = {
  status: number;
  message: string;
  data: BaseDiaryType[];
};

const getMainDiaries = async (
  type: string,
  startDate?: string,
  endDate?: string,
  currentDate?: string,
) => {
  const endpoint =
    type === "calendar"
      ? `${apiRoutes.mainDiary}?type=${type}&start=${startDate}&end=${endDate}`
      : `${apiRoutes.mainDiary}?type=${type}&date=${currentDate}`;
  const data = await api.get<IGetMainDiariesType>({
    endpoint,
  });
  return data;
};

export const useGetMainDiaries = (
  type: boolean,
  startDate: string,
  endDate: string,
  currentDate: string,
) => {
  return useQuery({
    queryKey: ["MAIN_DIARIES", type, startDate, endDate, currentDate],
    queryFn: () => {
      if (type) {
        return getMainDiaries("calendar", startDate, endDate);
      } else {
        return getMainDiaries("list", undefined, undefined, currentDate);
      }
    },
  });
};
