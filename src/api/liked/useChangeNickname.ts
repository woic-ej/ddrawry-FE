import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

const putNickname = async (nickname: string) => {
  const data = await api.put({
    endpoint: apiRoutes.changeUserNickname,
    body: { nickname: nickname },
  });
  return data;
};

export const useChangeNickname = (
  nickname: string,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => putNickname(nickname),
    onError: () => alert("닉네임 변경에 실패하셨습니다."),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] });
      alert("닉네임 변경에 성공하셨습니다.");
      setIsModalOpen(false);
    },
  });
};
