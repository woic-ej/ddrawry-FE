import { useLogin } from "@api/users/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const { data, isPending, isSuccess, isError } = useLogin(code!);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("access_token", data.access_token);
    }
  }, [isSuccess, data]);

  if (isPending) return <div>로그인 중</div>;
  if (isSuccess) {
    const redirectedFrom = sessionStorage.getItem("redirectedFrom") || "/";
    sessionStorage.removeItem("redirectedFrom");
    navigate(redirectedFrom, { replace: true });
  }
  if (isError) return <div>에러발생</div>;
};

export default OAuthRedirectHandler;
