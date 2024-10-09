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

// 좋아요 등록, 취소 API 호출부
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
    onMutate: async () => {
      // 쿼리를 취소 : 비동기 요청 중에 사용자가 다른 액션을 취하더라도 UI가 혼란스러워지지 않도록 하기위해
      await queryClient.cancelQueries({ queryKey });

      // 이전에 캐시된 데이터를 가져옴
      const previousData = queryClient.getQueryData<DiaryListType[]>(queryKey);

      // UI 업데이트
      queryClient.setQueryData(queryKey, (old: DiaryListType[]) => {
        return old.filter((diary) => diary.id !== id);
      });

      // 이전 상태 반환
      return { previousData };
    },
    onError: (error, _variables, context) => {
      console.log(error);
      // API 요청이 실패할 경우 이전 상태로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
