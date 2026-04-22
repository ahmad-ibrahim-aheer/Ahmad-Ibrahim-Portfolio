import { ArrowUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-lg">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Ahmad Ibrahim. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4">
          <Link to="/blog" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <BookOpen className="w-4 h-4" />
            Writings
          </Link>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-2 hidden sm:block" />
          <p className="text-sm text-zinc-500 dark:text-zinc-500 hidden sm:block">
            Built with React & Tailwind
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 ml-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
