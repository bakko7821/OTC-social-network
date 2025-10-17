import { useState, useEffect } from "react";

export function useThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("isDarkTheme");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const root = document.documentElement;

    const lightTheme = {
      "background-color": "#ffffff",
      "background-card-color": "#f0f0f0",
      "background-hover-color": "#e1e1e1",
      "active-color": "#c4c4c4",
      "text-color": "#1e1e1e",
      "svg-hover-color": "#000",
      "second-text-color": "#818181",
      "main-color": "#ff8000",
      "main-hover-color": "#ffa43c",
      "shadow-color": "rgba(0, 0, 0, 0.25)",
    };

    const darkTheme = {
      "background-color": "#1E1E1E",
      "background-card-color": "#242424",
      "background-hover-color": "#2A2A2A",
      "active-color": "#3a3a3a",
      "text-color": "#f5f5f5",
      "svg-hover-color": "#fff",
      "second-text-color": "#a0a0a0",
      "main-color": "#ff8000",
      "main-hover-color": "#ffa43c",
      "shadow-color": "rgba(255, 255, 255, 0.25)",
    };

    const currentTheme = isDark ? darkTheme : lightTheme;

    for (const [key, value] of Object.entries(currentTheme)) {
      root.style.setProperty(`--${key}`, value);
    }

    localStorage.setItem("themeColors", JSON.stringify(currentTheme));
    localStorage.setItem("isDarkTheme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev: boolean) => !prev);

  return { isDark, toggleTheme };
}
