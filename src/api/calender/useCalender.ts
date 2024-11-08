import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { BaseDiaryType} from "src/types/diaryTypes";

type IGetMainDiariesType = {
  status: number;
  message: string;
  data: BaseDiaryType[]
};

const getMainDiaries = async (type: string, date: string) => {
  const data = await api.get<IGetMainDiariesType>({
    endpoint: `${apiRoutes.mainDiary}?type=${type}&date=${date}`,
  });
  return data;
};

export const useGetMainDiaries = (type: boolean, date: string) => {
  return useQuery({
    queryKey: ["MAIN_DIARIES", type, date],
    queryFn: () => {
      if (type) {
        return getMainDiaries("calendar", date);
      } else {
        return getMainDiaries("list", date);
      }
    },
  });
};
