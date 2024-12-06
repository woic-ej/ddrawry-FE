import { useLogin } from "@api/users/useLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const { data, isLoading, isSuccess } = useLogin(code!);

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("access_token", data.access_token);
      const redirectedFrom = localStorage.getItem("redirectedFrom") || "/";
      navigate(redirectedFrom, { replace: true });
      localStorage.removeItem("redirectedFrom");
    }
  }, [isSuccess, navigate, data]);

  if (isLoading)
    return (
      <div className="h-screen">
        <LoadingSpinner />
      </div>
    );
};

export default OAuthRedirectHandler;
