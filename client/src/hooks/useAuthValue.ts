import { useState, useEffect } from "react";
import type { AuthContextType } from "../providers/AuthContext";

export const useAuthValue = (): AuthContextType => {
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useState<{ id: number; username?: string } | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    setIsAuth(true);
    setLoading(false);
  }, []);

  return { isAuth, setIsAuth, user, loading };
};
