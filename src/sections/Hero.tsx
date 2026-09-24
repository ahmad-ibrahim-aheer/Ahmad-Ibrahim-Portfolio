import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, HeroDepth } from "../components/Animation";
import { HeroVisual } from "../components/HeroVisual";
import { SITE } from "../data/site";

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow hero-eyebrow"
          >
            <span className="status-dot" />
            Software developer · AI & ML enthusiast
          </motion.div>
          <h1 aria-label="Ahmad Ibrahim">
            {["Ahmad", "Ibrahim."].map((word, i) => (
              <span className="word-mask" key={word}>
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.12 + i * 0.1,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="hero-lead">
              Thoughtful software.
              <br />
              <span>Intelligent possibilities.</span>
            </p>
            <p className="hero-description">
              I build modern web experiences and explore what comes next with
              AI. Turning ideas into scalable applications, from the interface
              to the backend.
            </p>
            <div className="button-row">
              <a href="#projects" className="button primary">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a href={SITE.contact} className="button secondary">
                Let's talk <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-details">
              <span>Based in Pakistan</span>
              <span className="tiny-divider" />
              <a href={SITE.github} target="_blank" rel="noreferrer">
                <Github size={15} /> GitHub <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>
        <HeroDepth>
          <HeroVisual />
          <div className="scene-label scene-label-top">
            <span className="status-dot" /> Ideas, connected.
          </div>
          <div className="scene-label scene-label-bottom">
            <span className="mono">01 /</span> SOFTWARE × INTELLIGENCE
          </div>
        </HeroDepth>
      </div>
      <div className="shell hero-bottom">
        <a href="#about" className="scroll-cue">
          <span className="scroll-arrow">
            <ArrowDown size={15} />
          </span>
          Scroll to explore
        </a>
        <div className="hero-stack">
          <span>React/Next.js</span>
          <span>PHP/Laravel</span>
          <span>Python & AI</span>
        </div>
        <span className="mono hero-index">PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
