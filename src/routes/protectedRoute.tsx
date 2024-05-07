import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../scripts/auth";

export const ProtectedRoute = ({
  redirectPath = "/",
  children,
}: {
  redirectPath?: string;
  children?: React.ReactNode;
}) => {
  const isAuth = checkAuth();
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
