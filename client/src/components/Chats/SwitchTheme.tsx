import { useState, useEffect } from "react";
import "../../styles/index.scss";
import "../../styles/main_page.scss";
import { DayIcon, NightIcon } from "../../assets/Icons";
import { applyTheme } from "../../theme";

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
        {isDark ? (
            <>
            <NightIcon /> Night Mode
            </>
        ) : (
            <>
            <DayIcon /> Day Mode
            </>
        )}
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

