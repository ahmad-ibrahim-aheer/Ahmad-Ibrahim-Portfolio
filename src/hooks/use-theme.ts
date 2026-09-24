import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "portfolio-theme";
const THEME_EVENT = "portfolio-theme-change";
let memoryChoice: Theme | null = null;

function preference(): Theme | null {
  if (memoryChoice) return memoryChoice;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}
function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#07090D" : "#F7F8FC");
}
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (!preference()) {
      applyTheme(systemTheme());
      onChange();
    }
  };
  const onStorage = (event: StorageEvent) => {
    if (
      event.storageArea !== localStorage ||
      (event.key !== STORAGE_KEY && event.key !== null)
    )
      return;
    memoryChoice = null;
    applyTheme(preference() ?? systemTheme());
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystem);
  };
}
function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function setTheme(theme: Theme) {
  memoryChoice = theme;
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Theme still works without storage. */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}
export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "dark" as const,
  );
  return { theme, setTheme };
}
