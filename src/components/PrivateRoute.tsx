import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" />;
};
