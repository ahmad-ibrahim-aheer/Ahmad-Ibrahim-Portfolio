import { Reveal } from "./Animation";

export function SectionHeader({
  title,
  subtitle,
  number,
  description,
}: {
  title: string;
  subtitle: string;
  number?: string;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div className="eyebrow">
        <span className="section-number">{number ?? "↗"}</span>
        {subtitle}
      </div>
      <div className="heading-row">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </Reveal>
  );
}
