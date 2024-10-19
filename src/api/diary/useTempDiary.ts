import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type TempDiaryResponse = {
  nickname: string;
  title?: string;
  weather?: string;
  mood?: string;
  story?: string;
  image?: string;
};

export type SaveTempDiaryPayload = {
  date: string;
} & TempDiaryResponse;

export type CancelTempDiaryPayload = {
  date: string;
  type: "main" | "write";
};

export const getTempDiary = async (tempId: string): Promise<TempDiaryResponse> => {
  try {
    const { data }: { data: TempDiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${tempId}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveTempDiary = async (tempId: string, body: SaveTempDiaryPayload) => {
  try {
    await api.put({ endpoint: `${apiRoutes.diaryTempSave}/${tempId}`, body });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const cancelTempDiary = async (body: CancelTempDiaryPayload) => {
  try {
    await api.post({ endpoint: apiRoutes.diaryTempCancel, body });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useSaveTempDiary = (tempId: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: SaveTempDiaryPayload) => saveTempDiary(tempId, body),
    onSuccess: () => {
      localStorage.removeItem(`temp-diary/${tempId}`);
      navigate(-1);
    },
    onError: (error) => alert(error),
  });
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
