import { useState, useEffect } from "react";
import "../../styles/index.scss";
import "../../styles/main_page.scss";

export const SwitchTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    const lightTheme = {
      "--background-color": "#ffffff",
      "--background-card-color": "#f0f0f0",
      "--background-card-hover-color": "#e1e1e1",
      "--main-color": "#2d62ff",
      "--text-color": "#1e1e1e",
      "--second-text-color": "#818181",
      "--second-text-hover-color": "#979797",
    };

    const darkTheme = {
      "--background-color": "#1e1e1e",
      "--background-card-color": "#2a2a2a",
      "--background-card-hover-color": "#353535",
      "--main-color": "#2d62ff",
      "--text-color": "#ffffff",
      "--second-text-color": "#aaaaaa",
      "--second-text-hover-color": "#cccccc",
    };

    const theme = isDark ? darkTheme : lightTheme;
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <label className="theme-toggle between">
        <span className="mode-text">{isDark ? "Night Mode" : "Day Mode"}</span>
        <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
        />
        <span className="slider"></span>
    </label>
  );
};

