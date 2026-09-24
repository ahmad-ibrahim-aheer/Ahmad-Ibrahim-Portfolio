import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'portfolio-theme';
const THEME_EVENT = 'portfolio-theme-change';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.style.colorScheme = theme;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    applyTheme(event.newValue === 'light' ? 'light' : 'dark');
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function getTheme(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Keep the toggle usable when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as const);
  return { theme, setTheme };
}
