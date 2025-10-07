import { useState } from "react";
import type { AuthContextType } from "../providers/AuthProviders";

export const useAuthValue = (): AuthContextType => {
  const [isAuth, setIsAuth] = useState(false);
  return { isAuth, setIsAuth };
};
