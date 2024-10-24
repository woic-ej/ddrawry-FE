import KakaoButton from "@components/buttons/KakaoButton";
import DefaultDiaryLogo from "@components/default/DefaultDiaryLogo";
import DefaultHeader from "@components/header/DefaultHeader";
import React from "react";

const REST_API_KEY = import.meta.env.VITE_APP_K_REST_API;
const REDIRECT_URI = "http://localhost:5173/oauth";
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="flex flex-col h-screen">
      <DefaultHeader title="띠로리" />
      <div className="flex-grow flex flex-col justify-center items-center gap-[80px]">
        <DefaultDiaryLogo />
        <div className="flex flex-col gap-[20px] ">
          <div className="title-font leading-[48.96px]">
            나만의 일상을 그림으로 그려주는 AI 그림 친구
          </div>
          <div className="text-[28px] leading-[38.08px] text-Primary">
            띠로리와 함께, 나의 하루를 그림으로 기록해요!
          </div>
        </div>
        <KakaoButton onClick={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
