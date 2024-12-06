import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { GetDiaryResponse } from "src/types/diaryTypes";



// 일기 조회
const getDiary = async (diaryId: string) => {
  const { data }: { data: GetDiaryResponse } = await api.get({
    endpoint: `${apiRoutes.diary}/${diaryId}?edit=false`,
  });
  return data;
};

export const useGetDiary = (diaryId: string) => {
  return useQuery({
    queryKey: [`diary${diaryId}`],
    queryFn: () => getDiary(diaryId),
    staleTime: Infinity,
  });
};
