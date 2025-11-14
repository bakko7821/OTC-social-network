import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../providers/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth, loading } = useAuth();

  if (loading) return null;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};
