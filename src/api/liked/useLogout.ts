import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type IPostResponseLogoutType = {
  message: string;
};

const postLogout = async () => {
  const data = await api.post<unknown, IPostResponseLogoutType>({ endpoint: apiRoutes.logout });
  return data;
};

export const useLogout = (setIsModalOpen: React.Dispatch<SetStateAction<boolean>>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => postLogout(),
    mutationKey: ["logout"],
    onSuccess: (data: IPostResponseLogoutType) => {
      // 로그인 전역 상태 초기화 로직 추가해야함
      alert(data.message);
      setIsModalOpen(false);
      navigate("/login");
    },
  });
};
