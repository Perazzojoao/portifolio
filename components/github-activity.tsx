import { getGitHubActivity } from "@/lib/github";
import { getLocale, getTranslations } from "next-intl/server";
import { GitHubLanguagesSummaryCard } from "./github-languages-summary-card";
import { GithubRepositoryCarousel } from "./github-pinned-carousel";
import { Reveal } from "./reveal";

export async function GithubActivity() {
  const [t, locale, activity] = await Promise.all([getTranslations("github"), getLocale(), getGitHubActivity()]);

  return (
    <section id="github" className="mx-auto max-w-section px-4 py-16 md:px-5 md:py-20">
      <Reveal>
        <h2 className="font-(--font-display) text-2xl text-white md:text-3xl">{t("title")}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-3 max-w-3xl text-muted leading-7">{t("description")}</p>
      </Reveal>

      <Reveal delay={0.09}>
        <GitHubLanguagesSummaryCard
          className="mt-8"
          title={t("languagesSummaryTitle")}
          subtitle={t("languagesSummaryDescription")}
          languages={activity.languageDistribution.topLanguages}
          locale={locale}
          othersLabel={t("languagesOthers")}
          centerLabel={t("languagesChartCenter")}
          emptyLabel={t("languagesChartEmpty")}
          repositoryCount={activity.languageDistribution.repositoryCount}
          repositoriesLabel={t("languagesRepositoriesAnalyzed")}
        />
      </Reveal>

      {activity.pinnedRepositories.length > 0 ? (
        <Reveal delay={0.16}>
          <GithubRepositoryCarousel
            className="mt-8"
            repositories={activity.pinnedRepositories}
            locale={locale}
            username={activity.username}
            labels={{
              badge: t("pinnedFeatured"),
              repo: t("repo"),
              commits: t("commits"),
              languages: t("languages"),
              updated: t("updated"),
              descriptionFallback: t("descriptionFallback"),
              previous: t("carouselPrevious"),
              next: t("carouselNext"),
            }}
          />
        </Reveal>
      ) : null}

      {activity.repositories.length > 0 ? (
        <Reveal delay={0.24}>
          <GithubRepositoryCarousel
            className="mt-8"
            repositories={activity.repositories}
            locale={locale}
            username={activity.username}
            showRecentCommitCount
            labels={{
              badge: t("featured"),
              repo: t("repo"),
              commits: t("commits"),
              languages: t("languages"),
              updated: t("updated"),
              descriptionFallback: t("descriptionFallback"),
              previous: t("carouselPrevious"),
              next: t("carouselNext"),
              recentPushCommits: t("recentPushCommits"),
            }}
          />
        </Reveal>
      ) : (
        <Reveal delay={0.14}>
          <article className="mt-6 rounded-3xl border border-[rgba(148,163,184,0.21)] bg-project-card p-5 text-sm text-foreground/78 shadow-project-card backdrop-blur-18 md:p-6">
            {t("reposEmpty")}
          </article>
        </Reveal>
      )}
    </section>
  );
}