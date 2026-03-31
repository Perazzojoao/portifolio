import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

type SkillGroup = {
  key: "frontend" | "backend" | "database" | "infra";
  items: string[];
};

const groups: SkillGroup[] = [
  { key: "frontend", items: ["Next.js", "React Native", "Tailwind CSS"] },
  { key: "backend", items: ["Python (FastAPI)", "Nest.js", "Golang"] },
  { key: "database", items: ["PostgreSQL", "Supabase", "Prisma ORM"] },
  {
    key: "infra",
    items: ["AWS (EC2, ECS, S3, VPC)", "Docker", "Kubernetes", "GitHub Actions CI/CD"],
  },
];

export function Skills() {
  const tAbout = useTranslations("about");
  const tSkills = useTranslations("skills");
  const primaryStack = ["Next.js", "React Native", "Python", "FastAPI", "Nest.js", "PostgreSQL", "Docker", "AWS"];

  return (
    <>
      <section id="about" className="mx-auto max-w-section px-4 py-16 md:px-5 md:py-20">
        <Reveal>
          <article className="w-full rounded-3xl border border-[var(--glass-border)] bg-organic-about p-6 shadow-card backdrop-blur-20 md:p-8 lg:p-10">
            <div className="flex justify-between items-center">
              <h2 className="font-(--font-display) text-2xl text-white md:text-3xl">{tAbout("title")}</h2>
              <p className="inline-flex w-fit self-center rounded-full border border-[rgba(102,225,255,0.28)] bg-about-subtitle px-[0.8rem] py-[0.38rem] text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(198,241,255,0.95)] shadow-about-subtitle md:text-sm">
                {tAbout("subtitle")}
              </p>
            </div>
            <div className="text-justify">
              <p className="mt-6 text-muted leading-7">{tAbout("text")}</p>
              <p className="mt-2 text-muted leading-7">{tAbout("exp")}</p>
              <p className="mt-2 text-muted leading-7">{tAbout("details")}</p>
            </div>
          </article>
        </Reveal>
      </section>

      <section id="skills" className="mx-auto max-w-section px-4 pb-16 md:px-5 md:pb-20">
        <div>
          <Reveal delay={0.06}>
            <h3 className="font-(--font-display) text-xl text-white md:text-2xl">{tSkills("title")}</h3>
          </Reveal>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
            <div className="md:col-span-1 xl:col-span-6">
              <Reveal delay={0.08}>
                <article className="rounded-3xl border border-[var(--glass-border)] bg-organic-stack p-5 shadow-card backdrop-blur-20 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/90">{tSkills("stackTitle")}</p>
                  <p className="mt-2 text-sm text-foreground/78">{tSkills("stackSubtitle")}</p>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {primaryStack.map((stack) => (
                      <li
                        key={stack}
                        className="rounded-full border border-white/12 bg-skill-chip px-3 py-1.5 text-xs font-medium text-foreground/92 backdrop-blur-12"
                      >
                        {stack}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>

            <div className="md:col-span-2 xl:col-span-12 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
              {groups.map((group, index) => (
                <div key={group.key} className="xl:col-span-6">
                  <Reveal delay={0.1 + index * 0.06}>
                    <article className="group rounded-3xl border border-[rgba(148,163,184,0.22)] bg-skill-card p-5 shadow-skill-card backdrop-blur-22 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--glass-border-strong)] hover:shadow-skill-card-hover md:p-6">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/95">{tSkills(group.key)}</h4>
                      <ul className="mt-4 space-y-2.5 text-sm text-foreground/90">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-white/10 bg-skill-row px-3 py-2.5 transition-[border-color,background] duration-[240ms] group-hover:border-[rgba(102,225,255,0.28)] group-hover:bg-skill-row-hover"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
