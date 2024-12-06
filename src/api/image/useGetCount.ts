import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { GetCountResponse } from "src/types/imageTypes";

const getCount = async (date: string) => {
  try {
    const { data }: { data: GetCountResponse } = await api.get({
      endpoint: `${apiRoutes.images}/count?date=${date}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetCount = (date: string) => {
  return useQuery({
    queryKey: ["countValue"],
    queryFn: () => getCount(date),
  });
};
