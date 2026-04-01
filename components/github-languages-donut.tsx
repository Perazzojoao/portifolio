"use client";

import { GITHUB_LANGUAGE_OTHERS_KEY, type GitHubLanguageStat } from "@/lib/github";
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00add8",
  HTML: "#e34c26",
  CSS: "#663399",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Rust: "#dea584",
  Java: "#b07219",
  [GITHUB_LANGUAGE_OTHERS_KEY]: "#94a3b8",
};

type GitHubLanguagesDonutProps = {
  languages: GitHubLanguageStat[];
  locale: string;
  othersLabel: string;
  centerLabel: string;
  emptyLabel: string;
  repositoryCount: number;
  repositoriesLabel: string;
  className?: string;
};

type DonutPoint = {
  name: string;
  label: string;
  bytes: number;
  percentage: number;
  fill: string;
};

type DonutTooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: DonutPoint;
  }>;
  locale: string;
};

function fallbackColorForLanguage(language: string): string {
  let hash = 0;

  for (let index = 0; index < language.length; index += 1) {
    hash = (hash << 5) - hash + language.charCodeAt(index);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;

  return `hsl(${hue} 70% 58%)`;
}

function getLanguageColor(name: string): string {
  return LANGUAGE_COLORS[name] ?? fallbackColorForLanguage(name);
}

function formatBytes(bytes: number, locale: string): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toLocaleString(locale, { maximumFractionDigits: 1 })} MB`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toLocaleString(locale, { maximumFractionDigits: 1 })} KB`;
  }

  return `${bytes.toLocaleString(locale)} B`;
}

function DonutTooltip({ active, payload, locale }: DonutTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0]?.payload;

  if (!entry) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/14 bg-[rgba(7,13,27,0.92)] px-3 py-2 text-xs text-foreground/92 shadow-[0_10px_26px_rgba(0,0,0,0.38)] backdrop-blur-16">
      <p className="font-medium text-white">{entry.label}</p>
      <p className="mt-1 text-foreground/78">{entry.percentage.toFixed(1)}%</p>
      <p className="text-foreground/60">{formatBytes(entry.bytes, locale)}</p>
    </div>
  );
}

export function GitHubLanguagesDonut({
  languages,
  locale,
  othersLabel,
  emptyLabel,
  repositoryCount,
  repositoriesLabel,
  className,
}: GitHubLanguagesDonutProps) {
  if (languages.length === 0) {
    return <p className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-foreground/72">{emptyLabel}</p>;
  }

  const data: DonutPoint[] = languages.map(language => ({
    name: language.name,
    label: language.name === GITHUB_LANGUAGE_OTHERS_KEY ? othersLabel : language.name,
    bytes: language.bytes,
    percentage: language.percentage,
    fill: getLanguageColor(language.name),
  }));

  const topLanguage = data[0];

  return (
    <div className={cn("grid gap-3.5 md:grid-cols-[minmax(210px,250px)_minmax(0,1fr)] md:items-center", className)}>
      <div className="relative mx-auto h-56 w-full max-w-62.5">
        <div className="pointer-events-none absolute inset-3 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(102,225,255,0.24),rgba(8,14,30,0)_65%)] blur-xl" />
        <div className="flex h-full items-center justify-center">
          <PieChart width={220} height={220}>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={90}
              paddingAngle={2}
              cornerRadius={8}
              stroke="rgba(6,11,24,0.72)"
              strokeWidth={2}
            >
              {data.map(entry => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip cursor={false} wrapperStyle={{ zIndex: 30 }} content={<DonutTooltip locale={locale} />} />
          </PieChart>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <strong className="mt-1 text-[1.45rem] leading-none text-white">{topLanguage.percentage.toFixed(1)}%</strong>
          <span className="mt-1 max-w-30 text-xs text-foreground/72">{topLanguage.label}</span>
        </div>
      </div>

      <div>
        <p className="mb-2 ml-1 text-[10px] uppercase tracking-[0.11em] text-foreground/64">
          {repositoryCount.toLocaleString(locale)} {repositoriesLabel}
        </p>
        <ul className="grid grid-cols-2 gap-2">
          {data.map(entry => (
            <li
              key={`${entry.name}-${entry.percentage}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-[rgba(7,14,29,0.56)] px-2.5 py-1.5 text-xs"
            >
              <span className="inline-flex min-w-0 items-center gap-2 text-foreground/92">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.fill }} />
                <span className="truncate">{entry.label}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-foreground/84">{entry.percentage.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}