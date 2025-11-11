export const applyTheme = (theme: "light" | "dark") => {
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

  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  for (const [key, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(key, value);
  }
};