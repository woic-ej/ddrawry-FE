import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { BaseDiaryType} from "src/types/diaryTypes";

type IGetMainDiariesType = {
  status: number;
  message: string;
  data: BaseDiaryType[]
};

const getMainDiaries = async (type: string, startDate: string, endDate: string) => {
  const data = await api.get<IGetMainDiariesType>({
    endpoint: `${apiRoutes.mainDiary}?type=${type}&start=${startDate}&end=${endDate}`,
  });
  return data;
};

export const useGetMainDiaries = (type: boolean, startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["MAIN_DIARIES", type, startDate, endDate],
    queryFn: () => {
      if (type) {
        return getMainDiaries("calendar", startDate, endDate);
      } else {
        return getMainDiaries("list", startDate, endDate);
      }
    },
  });
};
