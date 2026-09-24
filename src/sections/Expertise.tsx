import { ArrowDown, ArrowUpRight, GraduationCap, Workflow } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Animation";
import { AI_WORK, LARAVEL_WORK, type WorkCard } from "../data/portfolio";

function WorkCards({
  cards,
  className = "",
}: {
  cards: WorkCard[];
  className?: string;
}) {
  return (
    <div className={`work-grid ${className}`}>
      {cards.map(({ title, description, icon: Icon, skills }, i) => (
        <Reveal className="work-card" key={title} delay={(i % 2) * 0.06}>
          <div className="card-topline">
            <Icon size={21} aria-hidden="true" />
            <span className="mono">0{i + 1}</span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <ul className="tag-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function AIML() {
  return (
    <section id="ai-ml" className="section ai-section">
      <div className="shell">
        <SectionHeader
          number="04"
          subtitle="Applied intelligence"
          title="From raw data to possibility."
        />
        <div className="ai-layout">
          <div className="ai-intro">
            <Reveal>
              <div className="eyebrow cyan">AI / MACHINE LEARNING</div>
              <h3>
                Looking for patterns.
                <br />
                <span className="muted">Building understanding.</span>
              </h3>
              <p>
                From feature engineering and predictive modeling to financial
                NLP and language model fine-tuning, I use machine learning to
                explore data and build intelligent applications.
              </p>
              <ul className="tag-list accent-tags">
                {["Python", "Scikit-learn", "Hugging Face", "Google Colab"].map(
                  (tool) => (
                    <li key={tool}>{tool}</li>
                  ),
                )}
              </ul>
            </Reveal>
            <Reveal className="pipeline" variant="scale">
              <div className="pipeline-header">
                <Workflow size={17} />
                <span>Ideas into intelligence</span>
              </div>
              <div className="pipeline-stages">
                <span>News + OHLCV data</span>
                <ArrowDown size={15} />
                <span>Features + NER / tickers</span>
                <ArrowDown size={15} />
                <span className="pipeline-model">Models + experimentation</span>
              </div>
              <div className="pipeline-network" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
              <p>A conceptual view of my financial ML workflow.</p>
            </Reveal>
          </div>
          <WorkCards cards={AI_WORK} />
        </div>
      </div>
    </section>
  );
}

export function PHPLaravel() {
  return (
    <section id="php-laravel" className="section">
      <div className="shell">
        <SectionHeader
          number="05"
          subtitle="Experience & learning"
          title="A foundation built by doing."
          description="Taking concepts beyond the classroom, one practical project at a time."
        />
        <Reveal className="training-banner" variant="slide">
          <div className="training-icon">
            <GraduationCap size={28} />
          </div>
          <div>
            <div className="eyebrow">PNY Training · NAVTEC Program</div>
            <h3>PHP & Laravel</h3>
            <p>
              During my PNY Training under the NAVTEC program, I completed web
              development projects with PHP, Laravel, and MySQL. My hands-on
              work covered routing, MVC architecture, CRUD operations,
              authentication, and backend development.
            </p>
          </div>
          <a
            href="#skills"
            aria-label="Explore my technical skills"
            className="icon-button"
          >
            <ArrowUpRight />
          </a>
        </Reveal>
        <WorkCards cards={LARAVEL_WORK} className="training-grid" />
      </div>
    </section>
  );
}
