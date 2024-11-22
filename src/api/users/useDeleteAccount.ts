import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type IDeleteAccountType = {
  data: {
    id: number;
  };
  status: number;
  message: string;
};

const deleteAccount = async () => {
  const data = await api.delete<IDeleteAccountType>({ endpoint: apiRoutes.auth });
  return data;
};

export const useDeleteAccount = (setIsModalOpen: React.Dispatch<SetStateAction<boolean>>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      toast.success("회원탈퇴 되었습니다.");
      setIsModalOpen(false);
      localStorage.clear();
      navigate("/login");
    },
  });
};
