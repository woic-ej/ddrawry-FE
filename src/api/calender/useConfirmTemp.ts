import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type IGetResponseIsExistTempType = {
  status: number;
  message: string;
  data: IConfirmTempDataType;
};

type IConfirmTempDataType = {
  temp_id: number;
  is_temp_exist: boolean;
};

const getConfirmTemp = async (date: string) => {
  const data = await api.get<IGetResponseIsExistTempType>({
    endpoint: `${apiRoutes.diary}?date=${date}`,
  });
  return data;
};

export const useConfirmTemp = (
  date: string,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["IS_EXIST_TEMP", date],
    mutationFn: () => getConfirmTemp(date),
    onSuccess: (data) => {
      if (data.data.is_temp_exist) {
        setIsModalOpen(true);
      } else {
        navigate(`/write/${data.data?.temp_id}`);
      }
    },
  });
};
