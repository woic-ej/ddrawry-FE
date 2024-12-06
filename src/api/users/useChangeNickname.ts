import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const putNickname = async (nickname: string) => {
  const data = await api.put({
    endpoint: apiRoutes.changeUserNickname,
    body: { nickname },
  });
  return data;
};

export const useChangeNickname = (nickname: string, changeModalClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => putNickname(nickname),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.some((key) => String(key).includes("diary")),
      });
      toast.success("닉네임 변경에 성공하셨습니다.");
      changeModalClose();
    },
  });
};
