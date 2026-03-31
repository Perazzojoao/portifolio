import { useTranslations } from "next-intl";
import Image from "next/image";
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
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-12">
              <div>
                <h2 className="font-(--font-display) text-2xl text-white md:text-3xl">{tAbout("title")}</h2>
                <div className="text-justify">
                  <p className="mt-6 text-muted leading-7">{tAbout("text")}</p>
                  <p className="mt-2 text-muted leading-7">{tAbout("exp")}</p>
                  <p className="mt-2 text-muted leading-7">{tAbout("details")}</p>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[320px] perspective-distant">
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.2rem] bg-[radial-gradient(circle_at_45%_30%,rgba(102,225,255,0.32),rgba(15,23,42,0)_68%)] blur-2xl" />
                  <Image
                    src="/profile-picture/Imagem_perfil_sem_fundo.PNG"
                    alt="Foto de perfil"
                    width={520}
                    height={660}
                    priority
                    className="h-auto w-full rounded-b-[2.2rem] object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.48)] filter-[drop-shadow(0_0_10px_rgba(102,225,255,0.2))_drop-shadow(0_22px_30px_rgba(0,0,0,0.42))]"
                  />
                  <div className="pointer-events-none absolute inset-x-14 bottom-3 -z-10 h-10 rounded-full bg-black/45 blur-xl" />
                </div>
              </div>
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
