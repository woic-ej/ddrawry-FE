import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CancelTempDiaryPayload } from "src/types/tempTypes";

type IPostResponseCancelTempType = {
  status: number;
  message: string;
  data: { temp_id: number };
};

//임시다이어리 취소 api
const cancelTempDiary = async (body: CancelTempDiaryPayload) => {
  try {
    return await api.post<CancelTempDiaryPayload, IPostResponseCancelTempType>({
      endpoint: apiRoutes.diaryTempCancel,
      body,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCancelTempDiary = (tempId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: CancelTempDiaryPayload) => cancelTempDiary(body),
    onSuccess: (data) => {
      localStorage.removeItem(`temp-diary/${tempId}`);
      // type === 'write'일 경우
      if (data.status === 200) {
        navigate(-1);
      }
      // type === 'main'일 경우
      else if (data.status === 201) {
        navigate(`/write/${data.data.temp_id}`);
      }
    },
  });
};
