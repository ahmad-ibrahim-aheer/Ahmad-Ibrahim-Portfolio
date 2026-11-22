import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { HeroVisual } from "../components/HeroVisual";
import { Reveal } from "../components/Animation";
import { SectionHeader } from "../components/SectionHeader";
import "./GitHubActivity.css";

type ContributionDay = { date: string; count: number; level: number };
type ContributionData = {
  username: string;
  totalContributions: number;
  updatedAt?: string;
  days: ContributionDay[];
};

const COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const EMPTY_DATA: ContributionData = {
  username: "ahmad-ibrahim-aheer",
  totalContributions: 0,
  days: [],
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

function ContributionScene() {
  return (
    <div className="contribution-scene">
      <div className="contribution-scene-glow" aria-hidden="true" />
      <HeroVisual />
    </div>
  );
}

export function GitHubActivity() {
  const [data, setData] = useState<ContributionData>(EMPTY_DATA);

  useEffect(() => {
    let active = true;
    fetch("/github-contributions.json")
      .then((response) => {
        if (!response.ok) throw new Error("Contribution data unavailable");
        return response.json() as Promise<ContributionData>;
      })
      .then((payload) => {
        if (active && Array.isArray(payload.days)) setData(payload);
      })
      .catch(() => {
        // Keep the empty calendar as a graceful fallback.
      })
;
    return () => { active = false; };
  }, []);

  const totalLabel = useMemo(
    () => new Intl.NumberFormat("en").format(data.totalContributions),
    [data.totalContributions],
  );

  return (
    <section id="github-activity" className="section github-activity-section">
      <div className="shell">
        <SectionHeader
          number="03"
          subtitle="Open-source activity"
          title="Consistency, one commit at a time."
          description="A living snapshot of my GitHub contributions over the past year."
        />
        <Reveal className="contribution-card">
          <div className="contribution-card-top">
            <div>
              <p className="contribution-total">
                <strong>{totalLabel}</strong> contributions
              </p>
              <span className="contribution-caption">in the last year</span>
            </div>
            <a
              className="contribution-profile-link"
              href="https://github.com/ahmad-ibrahim-aheer"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> View GitHub <ArrowUpRight size={14} />
            </a>
          </div>
          <ContributionScene />
          <div className="contribution-card-footer">
            <span>Data from GitHub contribution history</span>
            {data.updatedAt && (
              <span>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(data.updatedAt))}</span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
