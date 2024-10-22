import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type IPatchUserSettingType = {
  dark_mode?: boolean;
  notification?: boolean;
};

type IPatchResponseUserSettingType = {
  status: number;
  message: string;
  data: {
    id: number;
    dark_mode?: number;
    notification?: number;
  };
};

const patchUserSetting = async (body: IPatchUserSettingType) => {
  const data = await api.patch<IPatchUserSettingType, IPatchResponseUserSettingType>({
    endpoint: apiRoutes.changeSettings,
    body,
  });
  return data;
};

export const useChangeUserSetting = (body: IPatchUserSettingType) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchUserSetting(body),
    onSuccess: async (data: IPatchResponseUserSettingType) => {
      await queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] });
      console.log(data.message);
    },
  });
};
