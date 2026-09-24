import { ArrowUp, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p>© {new Date().getFullYear()} Ahmad Ibrahim. All rights reserved.</p>
        <div>
          <span className="footer-built">
            <Code2 size={14} /> Built with React & Tailwind
          </span>
          <Link to="/blog">Writings</Link>
          <button
            className="icon-button"
            aria-label="Scroll to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
}
