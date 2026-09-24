import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" className="w-5 h-5 text-zinc-300" />
      ) : (
        <Moon aria-hidden="true" className="w-5 h-5 text-zinc-600" />
      )}
    </button>
  );
}
