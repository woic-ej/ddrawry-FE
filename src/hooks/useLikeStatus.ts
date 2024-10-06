import api from "@api/fetcher";
import { apiRoutes } from "@api/apiRoutes";
import { useState } from "react";

const useLikeStatus = (id: number, initialStatus: boolean) => {
  const [likeStatus, setLikeStatus] = useState<boolean>(initialStatus);
  const toggleLike = async () => {
    try {
      const { data }: { data: boolean } = await api.put({
        endpoint: `${apiRoutes.likeDiary}/${id}`,
        body: {
          bookmark: !initialStatus,
        },
      });
      setLikeStatus(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { likeStatus, toggleLike };
};

export default useLikeStatus;
