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
      const redirectedFrom = localStorage.getItem("redirectedFrom") || "/";
      navigate(redirectedFrom, { replace: true });
      localStorage.removeItem("redirectedFrom");
    }
  }, [isSuccess, navigate, data]);

  if (isPending) return <div>로그인 중</div>;
  if (isError) return <div>에러발생</div>;
};

export default OAuthRedirectHandler;
