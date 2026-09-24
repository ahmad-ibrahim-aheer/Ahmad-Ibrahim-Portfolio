import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "../components/Animation";
import { SectionHeader } from "../components/SectionHeader";
import { HIGHLIGHTS } from "../data/portfolio";
import { SITE } from "../data/site";
import portrait from "../components/assets/images/ahmad.webp";

export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeader
          number="01"
          subtitle="The person behind the code"
          title="Curiosity is the starting point."
        />
        <div className="about-grid">
          <Reveal className="portrait-card" variant="scale">
            <img
              src={portrait}
              alt="Ahmad Ibrahim"
              width="600"
              height="750"
              loading="lazy"
            />
            <div className="portrait-caption">
              <strong>Ahmad Ibrahim</strong>
              <span>
                <MapPin size={13} /> Pakistan
              </span>
            </div>
          </Reveal>
          <div className="about-story">
            <Reveal>
              <p className="large-copy">
                A developer with a learner's mindset.{" "}
                <span>
                  Connecting solid engineering with a curiosity for machine
                  intelligence.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                My journey in computer science began with a curiosity for how
                the internet works. Today, I build web applications from the
                ground up, with React for dynamic frontends and Node.js for
                backend logic.
              </p>
              <p>
                I'm pursuing a Bachelor's in Computer Science at the University
                of Sargodha, connecting academic theory with practical
                application. I care about clean, maintainable code, advanced web
                patterns, and scalable SaaS platforms.
              </p>
              <p>
                Alongside my work in AI/ML and PHP/Laravel, I'm progressively
                exploring mobile app development and cross-platform solutions.
              </p>
            </Reveal>
            <a
              className="text-link"
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
            >
              Follow what I'm building <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="about-bento">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.05} className="bento-card">
                <Icon className="card-icon" size={20} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
