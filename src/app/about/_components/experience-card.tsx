export interface ExperienceEntry {
  company: string;
  role?: string;
  period: string;
  tagline?: string;
  summary?: string;
  bullets: readonly string[];
  tech: readonly string[];
}

export function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="border-border/70 rounded-xl border p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-foreground text-lg font-bold tracking-tight">
          {entry.company}
          {entry.role && (
            <span className="text-muted-foreground ml-2 align-middle text-xs font-semibold">
              {entry.role}
            </span>
          )}
        </h3>
        <span className="text-muted-foreground text-sm tabular-nums">
          {entry.period}
        </span>
      </header>

      {entry.tagline && (
        <p className="text-muted-foreground mt-1.5 text-sm">{entry.tagline}</p>
      )}

      {entry.summary && (
        <p className="text-foreground/80 mt-3 text-sm leading-relaxed">
          {entry.summary}
        </p>
      )}

      <ul className="text-foreground/85 mt-4 space-y-1.5 text-sm leading-relaxed">
        {entry.bullets.map((b) => (
          <li key={b} className="flex gap-2.5">
            <span className="text-muted-foreground/60 mt-[9px] h-1 w-1 shrink-0 rounded-full bg-current" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {entry.tech.map((t) => (
          <span
            key={t}
            className="border-border bg-muted/40 rounded-full border px-2.5 py-0.5 text-[11px]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
