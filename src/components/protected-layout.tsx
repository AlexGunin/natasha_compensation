import { Navigate, Outlet } from "@tanstack/react-router";
import { useUserContext } from "../providers/user-provider";

export const ProtectedLayout = () => {
  const user = useUserContext();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};
