
import { createContext, useContext } from "react";

export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
  user?: { id: number; username?: string };
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
