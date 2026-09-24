import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS } from "../data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const reduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    const observed = new Set<Element>();
    const observeSections = () =>
      document.querySelectorAll("main section[id]").forEach((section) => {
        if (!observed.has(section)) {
          observer.observe(section);
          observed.add(section);
        }
      });
    observeSections();
    const contentObserver = new MutationObserver(observeSections);
    contentObserver.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });
    if (location.pathname === "/blog") setActive("blog");
    return () => {
      observer.disconnect();
      contentObserver.disconnect();
    };
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    menu?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const elements = [
          toggleRef.current,
          ...Array.from(menu?.querySelectorAll<HTMLElement>("a") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const current = elements.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && current <= 0) {
          event.preventDefault();
          elements.at(-1)?.focus();
        } else if (!event.shiftKey && current === elements.length - 1) {
          event.preventDefault();
          elements[0]?.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", keydown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", keydown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);
  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };
  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-panel">
        <Link to="/" className="brand" aria-label="Ahmad Ibrahim home">
          <span className="brand-mark">
            ai<span>.</span>
          </span>
          <span>
            Ahmad Ibrahim<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className={active === link.id ? "active" : ""}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={closeMenu}
                  aria-current={active === link.id ? "location" : undefined}
                >
                  <span className="mono">0{index + 1}</span>
                  {link.name}
                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </nav>
            <p>SOFTWARE × INTELLIGENCE</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
