import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../scripts/auth";
import { useToast } from "@chakra-ui/react";

export const ProtectedRoute = ({
  redirectPath = "/",
  children,
}: {
  redirectPath?: string;
  children?: React.ReactNode;
}) => {
  const toast = useToast();
  const isAuth = checkAuth();
  if (!isAuth) {
    toast({
      title: "Para criar um freela você precisa estar logado!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
