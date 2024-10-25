const REST_API_KEY = import.meta.env.VITE_APP_K_REST_API;
const REDIRECT_URI = `${window.location.origin}/oauth`;
export const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
