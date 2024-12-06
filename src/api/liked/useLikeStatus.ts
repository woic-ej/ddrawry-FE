import api from "@api/fetcher";
import { apiRoutes } from "@api/apiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DiaryListType } from "src/types/diaryTypes";
import { useDateControl } from "@hooks/useDateControl";
import { useToggleStore } from "@store/useToggleStore";
import { format } from "date-fns";
import toast from "react-hot-toast";

type LikeStatusResponse = {
  status: number;
  id: number;
  bookmark: boolean;
};

// 좋아요 등록, 취소 API 호출부
const updateLikeStatus = async (id: number): Promise<LikeStatusResponse> => {
  try {
    const { data }: { data: LikeStatusResponse } = await api.put({
      endpoint: `${apiRoutes.likeDiary}/${id}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLikeStatus = (id: number, isListPage?: boolean) => {
  const queryClient = useQueryClient();
  const { currentDate } = useDateControl();
  const { isTotalView } = useToggleStore();
  const queryKey = isTotalView
    ? ["likedDiaries", isTotalView]
    : ["likedDiaries", isTotalView, format(currentDate, "yyyyMM")];

  return useMutation<
    LikeStatusResponse,
    Error,
    void,
    { previousData: DiaryListType[] | undefined }
  >({
    mutationFn: () => updateLikeStatus(id),
    onMutate: async () => {
      if (!isListPage) return;
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
      toast.error("좋아요 요청에 실패했어요.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "likedDiaries",
      });
      queryClient.invalidateQueries({
        queryKey: [`diary${id}`],
      });
    },
  });
};
