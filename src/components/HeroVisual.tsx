import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

const NeuralScene = lazy(() => import("./NeuralScene"));

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroVisual() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (
      reduced ||
      nav.connection?.saveData ||
      (nav.deviceMemory && nav.deviceMemory <= 4) ||
      (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2)
    )
      return;
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const enable = () => setEnabled(media.matches);
    // Defer the optional 3D bundle until the first paint and main content are ready.
    const timer = window.setTimeout(enable, 900);
    media.addEventListener("change", enable);
    return () => {
      clearTimeout(timer);
      media.removeEventListener("change", enable);
    };
  }, [reduced]);
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orb-fallback">
        <div className="orb-core" />
        <div className="orb-ring ring-one" />
        <div className="orb-ring ring-two" />
        <div className="orb-ring ring-three" />
        <i className="orb-node node-one" />
        <i className="orb-node node-two" />
        <i className="orb-node node-three" />
      </div>
      {enabled && !reduced && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <NeuralScene />
          </Suspense>
        </SceneBoundary>
      )}
      <span className="orb-coordinate coord-one">BUILD</span>
      <span className="orb-coordinate coord-two">LEARN</span>
      <span className="orb-coordinate coord-three">CONNECT</span>
    </div>
  );
}
