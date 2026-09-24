import { BrainCircuit, Code2 } from "lucide-react";
import { Reveal } from "../components/Animation";
import { SectionHeader } from "../components/SectionHeader";
import { SKILLS } from "../data/portfolio";

const categories = [
  ...SKILLS.map((skill) =>
    skill.category === "Backend"
      ? { ...skill, items: ["Node.js", "Express", ...skill.items] }
      : skill,
  ),
  {
    category: "AI / Machine Learning",
    icon: BrainCircuit,
    items: [
      "Python",
      "Scikit-learn",
      "Hugging Face",
      "Google Colab",
      "Transformers",
    ],
  },
  {
    category: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "Python", "PHP", "SQL"],
  },
];
export function Skills() {
  return (
    <section id="skills" className="section section-tinted">
      <div className="shell">
        <SectionHeader
          number="02"
          subtitle="Tools of the trade"
          title="The right tools. Thoughtfully used."
          description="A connected toolkit for building interfaces, shaping data, and bringing ideas to life."
        />
        <div className="skills-grid">
          {categories.map(({ category, icon: Icon, items }, index) => (
            <Reveal
              key={category}
              delay={(index % 3) * 0.06}
              className="skill-card"
            >
              <div className="card-topline">
                <Icon size={22} aria-hidden="true" />
                <span className="mono">0{index + 1}</span>
              </div>
              <h3>{category}</h3>
              <ul className="tag-list">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
