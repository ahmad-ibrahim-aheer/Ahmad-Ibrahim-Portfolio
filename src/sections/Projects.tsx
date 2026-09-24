import { ArrowUpRight, Github, Check } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal, TiltCard } from "../components/Animation";
import { FEATURED_PROJECT as project } from "../data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeader
          number="03"
          subtitle="Selected work"
          title="Built to solve. Designed to scale."
          description="From a complex workflow to a considered product. A closer look at what I've been building."
        />
        <Reveal variant="scale">
          <article className="featured-project">
            <TiltCard className="project-visual">
              <img
                src={project.image.replace("w=2426", "w=1100")}
                alt="Analytics workspace illustration for the team and payroll platform"
                width="1100"
                height="740"
                loading="lazy"
              />
              <div className="project-visual-shade" />
              <div className="project-window" aria-hidden="true">
                <div className="window-top">
                  <span />
                  <span />
                  <span />
                  <p>CoreFlow / workspace</p>
                </div>
                <div className="window-content">
                  <span className="mono">ONE CONNECTED WORKSPACE</span>
                  <strong>
                    Teams. Projects.
                    <br />
                    Payroll.
                  </strong>
                  <div className="workspace-modules">
                    <span>Workspace</span>
                    <span>Time tracking</span>
                    <span>Team chat</span>
                    <span>Payroll</span>
                  </div>
                  <div className="window-bottom">
                    <span className="status-dot" /> Multi-tenant architecture{" "}
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
              <span className="visual-caption">
                PRODUCT CONCEPT / FULL-STACK APPLICATION
              </span>
            </TiltCard>
            <div className="project-info">
              <div className="eyebrow">
                <span className="status-dot" />
                Featured project <span className="mono project-no">01</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="project-features">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ul className="tag-list">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="button-row">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary"
                >
                  Live demo <ArrowUpRight size={17} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button secondary"
                >
                  <Github size={17} /> Source code
                </a>
              </div>
            </div>
          </article>
        </Reveal>
        <div className="project-note">
          <span>More ways I turn ideas into code</span>
          <a className="text-link" href="#ai-ml">
            Explore AI & machine learning <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
