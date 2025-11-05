import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<{ id: number; username?: string } | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setIsAuth(true);
        setUser(res.data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
