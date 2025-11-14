import { useState, useEffect } from "react";
import "../../styles/index.scss";
import "../../styles/main_page.scss";
import { NightIcon } from "../../assets/Icons";
import { applyTheme } from "../../utils/theme";

export const SwitchTheme = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }, [isDark]);

  return (
    <label className="theme-toggle between">
        <span className="mode-text flex center g8">
            <NightIcon /> Ночная тема
        </span>
        <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
        />
        <span className="slider"></span>
    </label>
  );
};

