import { ExternalLink, GitFork } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

type Project = {
  name: string;
  description: string;
  tags: string[];
  repo: string;
  demo: string;
};

const featuredProjects: Project[] = [
  {
    name: "FlowOps Platform",
    description: "SaaS platform for workflow automation with real-time operational dashboards.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
    repo: "https://github.com",
    demo: "https://example.com",
  },
  {
    name: "Scale Commerce Core",
    description: "Composable commerce backend and storefront architecture focused on performance.",
    tags: ["Nest.js", "Prisma", "Tailwind", "Supabase"],
    repo: "https://github.com",
    demo: "https://example.com",
  },
  {
    name: "Remote Team Insights",
    description: "Product analytics workspace for distributed engineering teams and delivery metrics.",
    tags: ["Golang", "React", "Kubernetes", "CI/CD"],
    repo: "https://github.com",
    demo: "https://example.com",
  },
];

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="mx-auto max-w-section px-4 py-16 md:px-5 md:py-20">
      <Reveal>
        <h2 className="font-(--font-display) text-2xl text-white md:text-3xl">{t("title")}</h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-3 max-w-3xl text-muted leading-7">{t("description")}</p>
      </Reveal>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.name} delay={0.12 + index * 0.08}>
            <article className="group rounded-3xl border border-[rgba(148,163,184,0.21)] bg-project-card p-5 shadow-project-card backdrop-blur-18 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(102,225,255,0.34)] hover:shadow-project-card-hover md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-white/16 bg-project-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/95">
                  {t("featured")}
                </span>
                <span className="text-xs text-foreground/60">0{index + 1}</span>
              </div>

              <div className="mb-4 h-32 rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(47,107,255,0.28),rgba(4,8,20,0.15)_50%,rgba(0,194,255,0.18))]" />
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-2 min-h-16 text-sm leading-6 text-muted">{project.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/12 bg-project-tag px-2.5 py-1 text-xs text-foreground/90">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3 text-sm">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/25 px-3 py-1.5 text-accent transition-colors hover:border-accent/50 hover:text-accent-glow"
                >
                  <GitFork size={15} />
                  {t("repo")}
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 px-3 py-1.5 text-white transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <ExternalLink size={15} />
                  {t("demo")}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
