import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    const currentPath = window.location.pathname + window.location.search;
    localStorage.setItem("redirectedFrom", currentPath);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
