"use client";

import type { GitHubLanguageStat } from "@/lib/github";
import dynamic from "next/dynamic";
import { SummaryCard } from "./ui/summary-card";

const GitHubLanguagesDonut = dynamic(
  () => import("./github-languages-donut").then(module => module.GitHubLanguagesDonut),
  { ssr: false },
);

type GitHubLanguagesSummaryCardProps = {
  title: string;
  subtitle: string;
  languages: GitHubLanguageStat[];
  locale: string;
  othersLabel: string;
  centerLabel: string;
  emptyLabel: string;
  repositoryCount: number;
  repositoriesLabel: string;
  className?: string;
};

export function GitHubLanguagesSummaryCard({
  title,
  subtitle,
  languages,
  locale,
  othersLabel,
  centerLabel,
  emptyLabel,
  repositoryCount,
  repositoriesLabel,
  className,
}: GitHubLanguagesSummaryCardProps) {
  return (
    <SummaryCard className={className} title={title} subtitle={subtitle}>
      <GitHubLanguagesDonut
        languages={languages}
        locale={locale}
        othersLabel={othersLabel}
        centerLabel={centerLabel}
        emptyLabel={emptyLabel}
        repositoryCount={repositoryCount}
        repositoriesLabel={repositoriesLabel}
      />
    </SummaryCard>
  );
}