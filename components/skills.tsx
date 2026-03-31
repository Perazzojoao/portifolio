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
      <section id="about" className="section-shell py-16 md:py-20">
        <Reveal>
          <article className="glass-panel organic-about-panel w-full rounded-3xl p-6 md:p-8 lg:p-10">
            <div className="flex justify-between items-center">
              <h2 className="font-(--font-display) text-2xl text-white md:text-3xl">{tAbout("title")}</h2>
              <p className="about-subtitle self-center text-xs font-semibold uppercase tracking-[0.14em] md:text-sm">{tAbout("subtitle")}</p>
            </div>
            <div className="text-justify">
              <p className="mt-6 text-muted leading-7">{tAbout("text")}</p>
              <p className="mt-2 text-muted leading-7">{tAbout("exp")}</p>
              <p className="mt-2 text-muted leading-7">{tAbout("details")}</p>
            </div>
          </article>
        </Reveal>
      </section>

      <section id="skills" className="section-shell pb-16 md:pb-20">
        <div>
          <Reveal delay={0.06}>
            <h3 className="font-(--font-display) text-xl text-white md:text-2xl">{tSkills("title")}</h3>
          </Reveal>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
            <div className="md:col-span-1 xl:col-span-6">
              <Reveal delay={0.08}>
                <article className="glass-panel organic-stack-panel rounded-3xl p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/90">{tSkills("stackTitle")}</p>
                  <p className="mt-2 text-sm text-foreground/78">{tSkills("stackSubtitle")}</p>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {primaryStack.map((stack) => (
                      <li key={stack} className="skill-chip rounded-full px-3 py-1.5 text-xs font-medium text-foreground/92">
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
                    <article className="glass-skill-card rounded-3xl p-5 transition-all duration-300 md:p-6">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/95">{tSkills(group.key)}</h4>
                      <ul className="mt-4 space-y-2.5 text-sm text-foreground/90">
                        {group.items.map((item) => (
                          <li key={item} className="skill-row rounded-xl px-3 py-2.5">
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
