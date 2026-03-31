"use client";

import { MessageCircleMore } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "./reveal";

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.29-.01-1.24-.01-2.25-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.08 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.59-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.23-3.23-.12-.3-.53-1.53.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.64.24 2.87.12 3.17.77.84 1.23 1.92 1.23 3.23 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55V14.9c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91v5.65H9.39V9h3.41v1.56h.05c.48-.9 1.63-1.84 3.36-1.84 3.59 0 4.24 2.36 4.24 5.42v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77A1.78 1.78 0 0 0 0 1.78v20.44C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="home" className="relative z-10 flex-1">
      <div className="relative z-10 mx-auto grid min-h-full max-w-section items-center gap-10 px-4 py-6 md:px-5 md:py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-10">
        <div className="order-2 space-y-8 lg:order-1">
          <Reveal>
            <span className="inline-flex rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent shadow-card backdrop-blur-20">
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-(--font-display) text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("greeting")} <span className="bg-text-gradient bg-clip-text text-transparent">{t("name")}</span>
              <br />
              <span className="text-white">{t("role")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">{t("summary")}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://docs.google.com/document/d/1acVoaPS4zmHjp5hulV5soRT9hY-bkSfp/edit?usp=sharing&ouid=113048300993126565137&rtpof=true&sd=true"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                {t("cvPt")}
              </a>
              <a
                href="https://docs.google.com/document/d/1Byi7GXmW-Ch2hryaos0eXmgaRana08dm/edit?usp=sharing&ouid=113048300993126565137&rtpof=true&sd=true"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {t("cvEn")}
              </a>
              <a
                href="https://wa.me/5583999815373"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/70 px-5 py-2.5 text-sm font-semibold text-accent transition-all duration-300 shadow-[0_0_15px_rgba(0,194,255,0.15)] hover:shadow-[0_0_40px_rgba(0,194,255,0.4)] hover:bg-accent/10"
              >
                <MessageCircleMore size={16} />
                {t("whatsapp")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">{t("social")}</span>
              <a
                href="https://github.com/Perazzojoao"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2 text-foreground shadow-card backdrop-blur-20 transition hover:text-accent"
                aria-label="GitHub"
              >
                <GitHubIcon size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/jo%C3%A3o-victor-perazzo-6a16292b5"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2 text-foreground shadow-card backdrop-blur-20 transition hover:text-accent"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={17} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="order-1 lg:order-2 lg:justify-self-end">
          <div className="relative mx-auto aspect-square w-64 sm:w-72 md:w-80 lg:w-88">
            <div className="pointer-events-none absolute inset-2 -z-20 rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.34)_0%,rgba(0,194,255,0.14)_50%,rgba(0,194,255,0.03)_72%,transparent_84%)] blur-xl" />
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,transparent_62%,rgba(6,8,15,0.24)_74%,rgba(6,8,15,0.55)_100%)]" />

            <div className="relative h-full w-full overflow-hidden rounded-full shadow-2xs shadow-accent/20">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(6,8,15,0.06)_72%,rgba(6,8,15,0.34)_88%,rgba(6,8,15,0.68)_100%)]" />
              <Image
                src="/profile-picture/profile.jpg"
                alt={t("name")}
                fill
                className="object-cover object-[50%_30%]"
                sizes="(min-width: 1024px) 352px, (min-width: 768px) 320px, (min-width: 640px) 288px, 256px"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
