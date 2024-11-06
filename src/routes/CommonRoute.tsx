import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const CommonRoute = () => {
  const [hasAccessToken, setHasAccessToken] = useState<boolean | null>(null);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    setHasAccessToken(!!access_token);
  }, []);

  if (hasAccessToken === null) return null;

  return hasAccessToken ? <Navigate to={"/"} /> : <Outlet />;
};

export default CommonRoute;
