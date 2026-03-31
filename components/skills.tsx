import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "./reveal";

type SkillGroup = {
  key: "frontend" | "backend" | "database" | "infra" | "messaging";
  items: string[];
};

const groups: SkillGroup[] = [
  {
    key: "frontend",
    items: ["Next.js", "React Native", "Tailwind CSS", "Zustand", "React Query", "Zod", "React Hook Form", "Axios", "Plate"],
  },
  {
    key: "backend",
    items: [
      "Python (FastAPI)",
      "Nest.js",
      "Golang",
      "Better Auth",
      "gRPC",
      "REST API",
      "WebSockets",
      "LLM Integration",
      "Microservices Architecture",
    ],
  },
  { key: "database", items: ["PostgreSQL", "Supabase", "Prisma ORM", "MongoDB"] },
  {
    key: "infra",
    items: ["AWS (EC2, ECS, S3, VPC)", "Docker", "Kubernetes", "GitHub Actions CI/CD", "Load Balancers"],
  },
  {
    key: "messaging",
    items: ["RabbitMQ", "Apache Kafka"],
  },
];

const groupLayout: Record<SkillGroup["key"], string> = {
  frontend: "xl:col-span-7",
  backend: "xl:col-span-5",
  database: "xl:col-span-6",
  infra: "xl:col-span-6",
  messaging: "xl:col-span-12",
};

const splitListLayout = new Set<SkillGroup["key"]>(["frontend", "backend", "infra"]);

const techIconPaths: Record<string, string> = {
  "Next.js": "/tech-icons/official/nextjs.svg",
  "React Native": "/tech-icons/official/react-native.svg",
  "Tailwind CSS": "/tech-icons/official/tailwindcss.svg",
  Zustand: "/tech-icons/official/zustand.svg",
  "React Query": "/tech-icons/official/react-query.svg",
  Zod: "/tech-icons/official/zod.svg",
  "React Hook Form": "/tech-icons/official/react-hook-form.svg",
  Axios: "/tech-icons/official/axios.svg",
  Plate: "/tech-icons/official/plate.svg",
  "Python (FastAPI)": "/tech-icons/official/fastapi.svg",
  "Nest.js": "/tech-icons/official/nestjs.svg",
  Golang: "/tech-icons/official/go.svg",
  "Better Auth": "/tech-icons/official/better-auth.svg",
  gRPC: "/tech-icons/official/grpc.svg",
  "REST API": "/tech-icons/official/rest-api.svg",
  WebSockets: "/tech-icons/official/websockets.svg",
  "LLM Integration": "/tech-icons/official/llm-integration.svg",
  "Microservices Architecture": "/tech-icons/official/microservices-architecture.svg",
  PostgreSQL: "/tech-icons/official/postgresql.svg",
  Supabase: "/tech-icons/official/supabase.svg",
  "Prisma ORM": "/tech-icons/official/prisma.svg",
  MongoDB: "/tech-icons/official/mongodb.svg",
  "AWS (EC2, ECS, S3, VPC)": "/tech-icons/official/aws.svg",
  Docker: "/tech-icons/official/docker.svg",
  Kubernetes: "/tech-icons/official/kubernetes.svg",
  "GitHub Actions CI/CD": "/tech-icons/official/github-actions.svg",
  "Load Balancers": "/tech-icons/official/load-balancers.svg",
  RabbitMQ: "/tech-icons/official/rabbitmq.svg",
  "Apache Kafka": "/tech-icons/official/apache-kafka.svg",
};

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
                <div key={group.key} className={groupLayout[group.key]}>
                  <Reveal delay={0.1 + index * 0.06}>
                    <article className="group rounded-3xl border border-[rgba(148,163,184,0.22)] bg-skill-card p-5 shadow-skill-card backdrop-blur-22 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--glass-border-strong)] hover:shadow-skill-card-hover md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/95">{tSkills(group.key)}</h4>
                        <span className="rounded-full border border-white/14 bg-white/6 px-2.5 py-1 text-[11px] font-medium text-foreground/70">
                          {group.items.length}
                        </span>
                      </div>
                      <ul
                        className={`mt-4 text-sm text-foreground/90 ${splitListLayout.has(group.key) ? "grid gap-2.5 sm:grid-cols-2" : "space-y-2.5"
                          }`}
                      >
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-white/10 bg-skill-row px-3 py-2.5 transition-[border-color,background] duration-[240ms] group-hover:border-[rgba(102,225,255,0.28)] group-hover:bg-skill-row-hover"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/90 p-1">
                                <Image src={techIconPaths[item]} alt={`${item} logo`} width={14} height={14} className="h-3.5 w-3.5 object-contain" />
                              </span>
                              <span>{item}</span>
                            </div>
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
