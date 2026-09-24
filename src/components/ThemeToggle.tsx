import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="icon-button theme-toggle"
      aria-label={label}
      title={label}
    >
      <Sun
        aria-hidden="true"
        className={theme === "dark" ? "theme-icon active" : "theme-icon"}
      />
      <Moon
        aria-hidden="true"
        className={theme === "light" ? "theme-icon active" : "theme-icon"}
      />
    </button>
  );
}
