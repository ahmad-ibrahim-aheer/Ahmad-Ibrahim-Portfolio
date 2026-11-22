import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Github, RotateCw } from "lucide-react";
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

function ContributionCanvas({
  days,
  total,
}: {
  days: ContributionDay[];
  total: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const visibleRef = useRef(false);
  const reducedRef = useRef(false);
  const [replayKey, setReplayKey] = useState(0);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; day: ContributionDay } | null>(null);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const rows = 7;
    const cols = Math.ceil(days.length / rows);
    if (!cols) return;
    const labelWidth = 27;
    const top = 8;
    const bottom = 8;
    const gap = Math.max(2, Math.min(4, width / 180));
    const cell = Math.max(2, Math.min(12, (width - labelWidth - (cols - 1) * gap) / cols));
    const gridWidth = cols * cell + (cols - 1) * gap;
    const gridHeight = rows * cell + (rows - 1) * gap;
    const left = labelWidth + Math.max(0, (width - labelWidth - gridWidth) / 2);
    const yOffset = top + Math.max(0, (height - top - bottom - gridHeight) / 2);

    ctx.font = "10px Geist, sans-serif";
    ctx.fillStyle = getComputedStyle(wrap).getPropertyValue("--muted").trim() || "#888";
    ctx.textAlign = "left";
    ["Mon", "", "Wed", "", "Fri", "", ""].forEach((label, row) => {
      if (label) ctx.fillText(label, 0, yOffset + row * (cell + gap) + cell * 0.78);
    });

    const elapsed = reducedRef.current ? Infinity : timestamp - startRef.current;
    const duration = 1450;
    days.forEach((day, index) => {
      const col = Math.floor(index / rows);
      const row = index % rows;
      const delay = (col + row * 1.35) * 11;
      const progress = Math.max(0, Math.min(1, (elapsed - delay) / duration));
      const eased = progress >= 1 ? 1 : 1 - Math.pow(1 - progress, 3);
      const size = cell * (0.18 + 0.82 * eased);
      const x = left + col * (cell + gap) + (cell - size) / 2;
      const y = yOffset + row * (cell + gap) + (cell - size) / 2;
      ctx.globalAlpha = 0.28 + 0.72 * eased;
      ctx.fillStyle = COLORS[Math.max(0, Math.min(4, day.level))];
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, Math.min(2.5, size * 0.24));
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (elapsed < duration + cols * 11 + rows * 15) {
      frameRef.current = requestAnimationFrame(draw);
    } else {
      frameRef.current = null;
    }
  }, [days]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = motionQuery.matches;
    const onMotionChange = () => {
      reducedRef.current = motionQuery.matches;
      if (visibleRef.current) {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        startRef.current = performance.now();
        frameRef.current = requestAnimationFrame(draw);
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && frameRef.current === null) {
          startRef.current = performance.now();
          frameRef.current = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(wrap);

    const resizeObserver = new ResizeObserver(() => {
      if (visibleRef.current) {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        startRef.current = performance.now();
        frameRef.current = requestAnimationFrame(draw);
      }
    });
    resizeObserver.observe(wrap);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [draw, replayKey]);

  const handlePointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !days.length) return;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const rows = 7;
    const cols = Math.ceil(days.length / rows);
    const labelWidth = 27;
    const gap = Math.max(2, Math.min(4, width / 180));
    const cell = Math.max(2, Math.min(12, (width - labelWidth - (cols - 1) * gap) / cols));
    const gridWidth = cols * cell + (cols - 1) * gap;
    const left = labelWidth + Math.max(0, (width - labelWidth - gridWidth) / 2);
    const gridHeight = rows * cell + (rows - 1) * gap;
    const yOffset = 8 + Math.max(0, (height - 16 - gridHeight) / 2);
    const x = event.clientX - rect.left - left;
    const y = event.clientY - rect.top - yOffset;
    const col = Math.floor(x / (cell + gap));
    const row = Math.floor(y / (cell + gap));
    const index = col * rows + row;
    if (
      col >= 0 && col < cols && row >= 0 && row < rows &&
      x % (cell + gap) <= cell && y % (cell + gap) <= cell && days[index]
    ) {
      setTooltip({
        x: Math.min(Math.max(8, event.clientX - rect.left), width - 170),
        y: Math.max(0, event.clientY - rect.top - 48),
        day: days[index],
      });
    } else {
      setTooltip(null);
    }
  };

  return (
    <div className="contribution-visual">
      <div ref={wrapRef} className="contribution-canvas-wrap">
        <canvas
          ref={canvasRef}
          aria-label={`GitHub contribution calendar with ${total} contributions in the last year`}
          onPointerMove={handlePointer}
          onPointerLeave={() => setTooltip(null)}
        />
        {tooltip && (
          <div className="contribution-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            <strong>{tooltip.day.count} contribution{tooltip.day.count === 1 ? "" : "s"}</strong>
            <span>{formatDate(tooltip.day.date)}</span>
          </div>
        )}
      </div>
      <div className="contribution-legend" aria-label="Contribution intensity legend">
        <span>Less</span>
        {COLORS.map((color, index) => (
          <span key={color} className="contribution-legend-cell" style={{ background: color }} aria-label={`Level ${index}`} />
        ))}
        <span>More</span>
        <button
          type="button"
          className="contribution-replay"
          onClick={() => {
            setTooltip(null);
            setReplayKey((value) => value + 1);
            startRef.current = performance.now();
            if (visibleRef.current) {
              if (frameRef.current) cancelAnimationFrame(frameRef.current);
              frameRef.current = requestAnimationFrame(draw);
            }
          }}
          aria-label="Replay contribution animation"
        >
          <RotateCw size={13} /> Replay
        </button>
      </div>
    </div>
  );
}

export function GitHubActivity() {
  const [data, setData] = useState<ContributionData>(EMPTY_DATA);
  const [loaded, setLoaded] = useState(false);

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
      .finally(() => {
        if (active) setLoaded(true);
      });
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
          {loaded && data.days.length > 0 ? (
            <ContributionCanvas days={data.days} total={data.totalContributions} />
          ) : (
            <div className="contribution-empty" role="status">
              {loaded ? "Contribution activity will appear after the first data refresh." : "Loading contribution activity…"}
            </div>
          )}
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
