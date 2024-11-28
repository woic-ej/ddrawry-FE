import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { CustomError } from "@utils/CustomError";
import { SetStateAction } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProfileModalType } from "src/types/modalType";

type IGetResponseLogoutType = {
  message: string;
};

const postLogout = async () => {
  const data = await api.get<IGetResponseLogoutType>({ endpoint: apiRoutes.logout });
  return data;
};

const refreshKakaoToken = async (): Promise<void> => {
  await api.get({ endpoint: apiRoutes.refreshKakao });
};

const retryLogout = async (): Promise<void> => {
  await refreshKakaoToken();
  await postLogout();
};

export const useLogout = (setIsModalOpen: React.Dispatch<SetStateAction<ProfileModalType>>) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
      localStorage.removeItem("access_token");
      setIsModalOpen(null);
      navigate("/login");
    },
    onError: async (error) => {
      if (error instanceof CustomError) {
        if (error.statusCode === 401 && error.message.includes("kakao")) {
          try {
            await retryLogout();
          } catch (retryError) {
            console.error("Retry 로그아웃 실패:", retryError);
            toast.error("로그아웃에 실패했습니다. 다시 시도해주세요.");
          }
        } else {
          toast.error("요청 실패");
        }
      }
    },
  });
};
