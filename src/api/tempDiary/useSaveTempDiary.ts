import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TempDiaryType } from "src/types/tempTypes";

// 임시다이어리 저장 api
const saveTempDiary = async (tempId: string, body: TempDiaryType) => {
  try {
    await api.put({ endpoint: `${apiRoutes.diaryTemp}/${tempId}`, body });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useSaveTempDiary = (tempId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: TempDiaryType) => saveTempDiary(tempId, body),
    onSuccess: () => {
      localStorage.removeItem(`temp-diary/${tempId}`);
      navigate(-1);
    },
    onError: (error) => alert(error),
  });
};
