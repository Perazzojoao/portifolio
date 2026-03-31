import { MessageCircleMore } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="mx-auto max-w-section px-4 py-16 md:px-5 md:py-20">
      <Reveal>
        <article className="rounded-3xl border border-[var(--glass-border)] bg-contact-shell p-7 shadow-card backdrop-blur-20 md:p-9">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/90 [text-shadow:0_0_22px_rgba(102,225,255,0.26)]">
            {t("kicker")}
          </span>
          <h2 className="mt-3 font-(--font-display) text-2xl text-white md:text-3xl">{t("title")}</h2>
          <p className="mt-3 max-w-2xl text-muted leading-7">{t("text")}</p>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="https://wa.me/5583999815373"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-blue-glow ring-1 ring-inset ring-white/8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                <MessageCircleMore size={16} />
                {t("cta")}
              </a>
              <p className="text-xs text-foreground/65">{t("availability")}</p>
            </div>
          </Reveal>
        </article>
      </Reveal>
    </section>
  );
}
