import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "scale" | "slide";
}) {
  const reduced = useReducedMotion();
  const initial = reduced
    ? false
    : {
        opacity: 0,
        y: variant === "rise" ? 22 : 0,
        x: variant === "slide" ? -20 : 0,
        scale: variant === "scale" ? 0.97 : 1,
      };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 25 });
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    rx.set(-((event.clientY - box.top) / box.height - 0.5) * 4);
    ry.set(((event.clientX - box.left) / box.width - 0.5) * 4);
  };
  return (
    <motion.div
      className={`tilt-card ${className}`}
      onPointerMove={move}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function HeroDepth({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 65]);
  return (
    <motion.div ref={ref} style={{ y: reduced ? 0 : y }} className="hero-art">
      {children}
    </motion.div>
  );
}
