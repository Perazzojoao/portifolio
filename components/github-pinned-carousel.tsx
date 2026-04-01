"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { GitHubLanguageStat } from "@/lib/github";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { ExternalLink, GitCommitHorizontal, GitFork, Star } from "lucide-react";
import { useRef } from "react";

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
};

export type GitHubCarouselRepository = {
  id: string | number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  pushedAt: string;
  languages: GitHubLanguageStat[];
  recentCommitCount?: number;
};

export type GithubRepositoryCarouselLabels = {
  badge: string;
  repo: string;
  commits: string;
  languages: string;
  updated: string;
  descriptionFallback: string;
  previous: string;
  next: string;
  recentPushCommits?: string;
};

type GithubRepositoryCarouselProps = {
  repositories: GitHubCarouselRepository[];
  locale: string;
  username: string;
  labels: GithubRepositoryCarouselLabels;
  className?: string;
  showRecentCommitCount?: boolean;
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

function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? fallbackColorForLanguage(language);
}

function formatPushDate(dateIso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateIso));
}

function formatLanguagePercentage(language: GitHubLanguageStat): string {
  return `${language.percentage.toFixed(1)}%`;
}

export function GithubRepositoryCarousel({
  repositories,
  locale,
  username,
  labels,
  className,
  showRecentCommitCount = false,
}: GithubRepositoryCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );

  const shouldLoop = repositories.length > 1;
  const navigationButtonBaseClass =
    "top-1/2 z-20 h-11 w-11 -translate-y-1/2 border-white/30 bg-[rgba(8,14,30,0.88)] text-foreground shadow-[0_10px_32px_rgba(7,14,30,0.45),0_0_0_1px_rgba(102,225,255,0.22)] backdrop-blur-18 transition-all duration-200 hover:scale-[1.04] hover:border-accent/70 hover:bg-[rgba(47,107,255,0.36)] hover:text-accent-glow focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(6,10,21,0.92)] disabled:opacity-35 [&_svg]:size-5";

  return (
    <div className={cn("relative mt-6", className)}>
      <Carousel
        opts={{ align: "start", loop: shouldLoop }}
        plugins={shouldLoop ? [autoplay.current] : undefined}
        className="w-full rounded-2xl"
      >
        <CarouselContent className="ml-0 px-2 pt-2 pb-12">
          {repositories.map((repository, index) => (
            <CarouselItem key={repository.id} className="md:basis-1/2 xl:basis-1/3">
              <article className="group flex h-full flex-col rounded-3xl border border-[rgba(148,163,184,0.21)] bg-project-card p-5 shadow-project-card backdrop-blur-18 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(102,225,255,0.34)] hover:shadow-project-card-hover md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/16 bg-project-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/95">
                    {labels.badge}
                  </span>
                  <span className="text-xs text-foreground/60">0{index + 1}</span>
                </div>

                <h3 className="text-lg font-semibold text-white">{repository.name}</h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-muted">{repository.description ?? labels.descriptionFallback}</p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(47,107,255,0.28),rgba(4,8,20,0.15)_50%,rgba(0,194,255,0.18))] p-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-foreground/72">
                    <span>{labels.languages}</span>
                    <span>{formatPushDate(repository.pushedAt, locale)}</span>
                  </div>

                  <div className="mt-2 flex h-2 overflow-hidden rounded-full border border-white/12 bg-black/35">
                    {repository.languages.length > 0 ? (
                      repository.languages.map((language) => (
                        <span
                          key={`${repository.id}-${language.name}`}
                          style={{
                            width: `${Math.max(language.percentage, 2)}%`,
                            backgroundColor: getLanguageColor(language.name),
                          }}
                          title={`${language.name} ${formatLanguagePercentage(language)}`}
                        />
                      ))
                    ) : (
                      <span className="h-full w-full bg-white/18" />
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-foreground/92">
                    {repository.languages.slice(0, 3).map((language) => (
                      <span key={`${repository.id}-${language.name}-label`} className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: getLanguageColor(language.name) }} />
                        {language.name} {formatLanguagePercentage(language)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-foreground/72">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={13} />
                    {repository.stars.toLocaleString(locale)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork size={13} />
                    {repository.forks.toLocaleString(locale)}
                  </span>
                </div>

                <p className="mt-3 text-xs text-foreground/66">
                  {labels.updated}: {formatPushDate(repository.pushedAt, locale)}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <a
                    href={repository.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/25 px-3 py-1.5 text-accent transition-colors hover:border-accent/50 hover:text-accent-glow"
                  >
                    <ExternalLink size={15} />
                    {labels.repo}
                  </a>

                  <a
                    href={`${repository.url}/commits?author=${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 px-3 py-1.5 text-white transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <GitCommitHorizontal size={15} />
                    {labels.commits}
                  </a>
                </div>

                {showRecentCommitCount && labels.recentPushCommits && repository.recentCommitCount && repository.recentCommitCount > 0 ? (
                  <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-foreground/58">
                    {repository.recentCommitCount.toLocaleString(locale)} {labels.recentPushCommits}
                  </p>
                ) : null}
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label={labels.previous}
          className={cn("-left-1.5 md:-left-1.5", navigationButtonBaseClass)}
        />
        <CarouselNext
          aria-label={labels.next}
          className={cn("-right-1.5 md:-right-3.5", navigationButtonBaseClass)}
        />
      </Carousel>
    </div>
  );
}