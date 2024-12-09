import { useEffect } from "react";
import toast from "react-hot-toast";

const useKakaoShare = () => {
  useEffect(() => {
    const initializeKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      }
    };

    if (document.readyState === "complete") {
      initializeKakao();
    } else {
      window.addEventListener("load", initializeKakao);
      return () => window.removeEventListener("load", initializeKakao);
    }
  }, []);

  const shareToKakao = async (diaryId: number, token: string) => {
    if (typeof window === "undefined") {
      toast.error("윈도우가 정의되어 있지 않습니다.");
      return;
    }
    const { Kakao } = window;
    if (!Kakao || !Kakao.Share || !Kakao.Share.sendDefault) {
      toast.error("카카오 공유 api를 이용할 수 없습니다.");
      return;
    }
    try {
      const shareUrl = `${window.location.origin}/share/?id=${diaryId}&token=${token}`;
      const imageUrl =
        "https://ddrawry-bucket-test-1.s3.ap-northeast-2.amazonaws.com/logo/ddrawry.png";

      if (!shareUrl) {
        toast.error("링크 생성에 실패하였습니다.");
      }
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "내 그림일기를 공유해요",
          description: "DDrawry(띠로리) - 그림 생성 AI를 활용한 그림 일기 작성 서비스",
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } catch (error) {
      toast.error(`Error during share process: ${error}`);
    }
  };
  return { shareToKakao };
};

export default useKakaoShare;
