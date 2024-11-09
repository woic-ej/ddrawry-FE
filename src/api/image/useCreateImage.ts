import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation } from "@tanstack/react-query";
import { CreateImagePayLoad } from "src/types/imageTypes";

type CreateImageResponse = {
  image_url: string;
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
  return useMutation<CreateImageResponse, Error, CreateImagePayLoad>({
    mutationFn: (body) => createImage(body),
    onSuccess: (data) => {
      setValue("image", data.image_url);
    },
  });
};
