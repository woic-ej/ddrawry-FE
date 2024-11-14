import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";

type IPostResponseShareDiaryType = {
  image_url: string;
};

export const postShareDiaryImage = async (diaryId: number, imageBase64Url: string) => {
  const { data }: { data: IPostResponseShareDiaryType } = await api.post({
    endpoint: apiRoutes.sharedDiary,
    body: {
      diary_id: diaryId,
      image: imageBase64Url,
    },
  });
  return data;
};
