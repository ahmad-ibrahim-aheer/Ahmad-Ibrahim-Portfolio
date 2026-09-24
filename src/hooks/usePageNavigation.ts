import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "motion/react";

// Runs inside each page, after lazy routes and their anchor targets have mounted.
export function usePageNavigation() {
  const { pathname, hash } = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Keep malformed fragments harmless. */
      }
      if (id)
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, reduced]);
}
