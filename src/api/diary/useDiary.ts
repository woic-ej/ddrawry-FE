import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DiaryFormData } from "src/types/WriteDiaryTypes";

type DiaryResponse = {
  date: string;
  nickname: string;
  title: string;
  weather: string;
  mood: string;
  story: string;
  bookmark: boolean;
  image?: string;
};

type WriteDiaryPayLoad = {
  date: string;
  nickname: string;
} & DiaryFormData;

type WriteDiaryResponse = {
  id: number;
};

export type EditDiaryResponse = {
  temp_id: number;
};

// 일기 조회
const getDiary = async (diaryId: string) => {
  try {
    const { data }: { data: DiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${diaryId}?edit=false`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 일기 삭제
const deleteDiary = async (diaryId: string) => {
  try {
    await api.delete({ endpoint: `${apiRoutes.diary}/${diaryId}` });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 일기 수정 => 기존 임시데이터 사용 X 새로운 임시데이터 발급
export const editDiary = async (diaryId: string) => {
  try {
    const { data }: { data: EditDiaryResponse } = await api.get({
      endpoint: `${apiRoutes.diary}/${diaryId}?edit=true`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 일기 수정
const updateDiary = async (diaryId: string, diaryData: WriteDiaryPayLoad) => {
  try {
    const { data }: { data: WriteDiaryResponse } = await api.put({
      endpoint: `${apiRoutes.diary}/${diaryId}`,
      body: diaryData,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 일기 작성
const postDiary = async (diaryData: WriteDiaryPayLoad) => {
  try {
    const { data }: { data: WriteDiaryResponse } = await api.post({
      endpoint: apiRoutes.diary,
      body: diaryData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useGetDiary = (diaryId: string) => {
  return useQuery({
    queryKey: [`diary${diaryId}`],
    queryFn: () => getDiary(diaryId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteDiary = (diaryId: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteDiary(diaryId),
    onSuccess: () => navigate(-1),
  });
};

export const useUpdateDiary = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ diaryId, diaryData }: { diaryId: string; diaryData: WriteDiaryPayLoad }) =>
      updateDiary(diaryId, diaryData),
    onSuccess: (data) => {
      navigate(-2);
      queryClient.invalidateQueries({
        queryKey: [`diary${data.id}`],
      });
    },
  });
};

export const useWriteDiary = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (diaryData: WriteDiaryPayLoad) => postDiary(diaryData),
    onSuccess: (data) => {
      navigate(`/diary/${data.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
