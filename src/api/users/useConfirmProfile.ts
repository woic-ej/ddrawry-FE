import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useQuery } from "@tanstack/react-query";

type IGetResponseUserProfile = {
  status: number;
  message: string;
  data: {
    id: number;
    nickname: string;
    darkmode: boolean;
    notification: boolean;
  };
};

const fetchConfirmProfile = async () => {
  const data = await api.get<IGetResponseUserProfile>({ endpoint: apiRoutes.userProfile });
  return data;
};

export const useConfirmProfile = () => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: () => fetchConfirmProfile(),
  });
};
