import { apiRoutes } from "@api/apiRoutes";
import api from "@api/fetcher";
import { useTempDataStore } from "@store/useTempDataStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteImageResponse = {
  image_count: number;
};

const deleteImage = async (imageId: number) => {
  try {
    const { data }: { data: DeleteImageResponse } = await api.delete({
      endpoint: `${apiRoutes.images}/${imageId}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useDeleteImage = (
  tempId: string,
  setIsDeleteImageModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  const { addTempData } = useTempDataStore();

  return useMutation<DeleteImageResponse, Error, number>({
    mutationFn: (imageId) => deleteImage(imageId),
    onSuccess: (data) => {
      setIsDeleteImageModal(false);
      queryClient.invalidateQueries({ queryKey: ["images", tempId] });
      addTempData("image_count", data.image_count);
    },
  });
};
