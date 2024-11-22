import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateImagePayLoad } from "src/types/imageTypes";

type CreateImageResponse = {
  image_url: string;
  remain_count: number;
  image_count: number;
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

export const useCreateImage = (
  setValue: (field: "image", value: string) => void,
  tempId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation<CreateImageResponse, Error, CreateImagePayLoad>({
    mutationFn: (body) => createImage(body),
    onSuccess: (data) => {
      queryClient.setQueryData(["countValue"], {
        image_count: data.image_count,
        remain_count: data.remain_count,
      });
      setValue("image", data.image_url);
      queryClient.invalidateQueries({ queryKey: ["images", tempId] });
    },
  });
};
