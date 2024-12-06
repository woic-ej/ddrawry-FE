import { Navigate, Outlet } from "react-router-dom";

const CommonRoute = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default CommonRoute;
