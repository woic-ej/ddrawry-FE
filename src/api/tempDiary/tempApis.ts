import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { EditDiaryResponse, HasTempDiaryResponse, TempDiaryType } from "src/types/tempTypes";

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
