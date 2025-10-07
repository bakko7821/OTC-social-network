/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode} from "react";
import { useAuthValue } from "../hooks/useAuth";

export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = useAuthValue();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
