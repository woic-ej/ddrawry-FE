import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const handleError = (error: Error) => {
  if (error instanceof Error) {
    toast.error(`요청에 실패하였습니다.`);
  } else {
    toast.error("알 수 없는 에러가 발생했습니다.");
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: handleError,
    },
  },
});
