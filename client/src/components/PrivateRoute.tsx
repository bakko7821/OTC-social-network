import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../providers/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth, loading } = useAuth();

  if (loading) return null; // пока идет проверка токена — ничего не рендерим
  if (!isAuth) return <Navigate to="/login" replace />; // если не авторизован — редирект

  return children; // если авторизован — отрисовываем компонент
};
