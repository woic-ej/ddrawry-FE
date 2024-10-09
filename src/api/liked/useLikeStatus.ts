import api from "@api/fetcher";
import { apiRoutes } from "@api/apiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DiaryListType } from "src/types/diaryTypes";
import { useDateControl } from "@hooks/useDateControl";
import { useToggleStore } from "@store/useToggleStore";
import { format } from "date-fns";

type LikeDiaryPayload = {
  bookmark: boolean;
};

type LikeDiaryResponse = {
  status: number;
  id: number;
  bookmark: boolean;
};

const updateLikeStatus = async (
  id: number,
  newStatus: LikeDiaryPayload,
): Promise<LikeDiaryResponse> => {
  try {
    const data: LikeDiaryResponse = await api.put({
      endpoint: `${apiRoutes.likeDiary}/${id}`,
      body: newStatus,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLikeStatus = (id: number) => {
  const queryClient = useQueryClient();
  const { currentDate } = useDateControl();
  const { isTotalView } = useToggleStore();
  const queryKey = ["likedDiaries", isTotalView, format(currentDate, "yyyyMM")];

  return useMutation<
    LikeDiaryResponse,
    Error,
    LikeDiaryPayload,
    { previousData: DiaryListType[] | undefined }
  >({
    mutationFn: (newStatus: LikeDiaryPayload) => updateLikeStatus(id, newStatus),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<DiaryListType[]>(queryKey);

      queryClient.setQueryData(queryKey, (old: DiaryListType[]) => {
        return old.map((diary) => (diary.id === id ? { ...diary, bookmark: newStatus } : diary));
      });

      return { previousData };
    },
    onError: (error, _variables, context) => {
      console.log(error);
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
