import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type IGetResponseLogoutType = {
  message: string;
};

const postLogout = async () => {
  const data = await api.get<IGetResponseLogoutType>({ endpoint: apiRoutes.logout });
  return data;
};

export const useLogout = (setIsModalOpen: React.Dispatch<SetStateAction<boolean>>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
      localStorage.clear();
      setIsModalOpen(false);
      navigate("/login");
    },
  });
};
