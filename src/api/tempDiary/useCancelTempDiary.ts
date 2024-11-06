import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CancelTempDiaryPayload } from "src/types/tempTypes";

//임시다이어리 취소 api
const cancelTempDiary = async (body: CancelTempDiaryPayload) => {
  try {
    await api.post({ endpoint: apiRoutes.diaryTempCancel, body });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCancelTempDiary = (tempId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: CancelTempDiaryPayload) => cancelTempDiary(body),
    onSuccess: () => {
      localStorage.removeItem(`temp-diary/${tempId}`);
      navigate(-1);
    },
    onError: (error) => alert(error),
  });
};
