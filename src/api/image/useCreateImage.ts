import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { CreateImagePayLoad } from "src/types/imageTypes";
import { useTempDataStore } from "@store/useTempDataStore";

type CreateImageResponse = {
  image_url: string;
  remain_count: number;
};

const createImage = async (body: CreateImagePayLoad): Promise<CreateImageResponse> => {
  try {
    const { data }: { data: CreateImageResponse } = await api.post({
      endpoint: apiRoutes.images,
      body,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCreateImage = (setValue: (field: "image", value: string) => void) => {
  const { addTempData } = useTempDataStore();

  return useMutation<CreateImageResponse, Error, CreateImagePayLoad>({
    mutationFn: (body) => createImage(body),
    onSuccess: (data) => {
      addTempData("remain_count", data.remain_count);
      setValue("image", data.image_url);
    },
  });
};
