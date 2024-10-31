import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type TempDiaryType = {
  date: string;
  nickname: string;
  title?: string;
  weather?: string;
  mood?: string;
  story?: string;
  image?: string;
};

export type CancelTempDiaryPayload = {
  date: string;
  type: "main" | "write";
};

export type HasTempDiaryResponse = {
  temp_id: number;
  is_temp_exist: boolean;
};

// 임시다이어리 조회 api
export const getTempDiary = async (tempId: string): Promise<TempDiaryType> => {
  try {
    const { data }: { data: TempDiaryType } = await api.get({
      endpoint: `${apiRoutes.diaryTemp}/${tempId}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 임시다이어리를 가지고있는지 여부 조회 api
export const hasTempDiary = async (date: string) => {
  try {
    const { data }: { data: HasTempDiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}?date=${date.replace(/-/g, "")}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 임시다이어리 저장 api
const saveTempDiary = async (tempId: string, body: TempDiaryType) => {
  try {
    await api.put({ endpoint: `${apiRoutes.diaryTemp}/${tempId}`, body });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//임시다이어리 취소 api
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
    mutationFn: (body: TempDiaryType) => saveTempDiary(tempId, body),
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
