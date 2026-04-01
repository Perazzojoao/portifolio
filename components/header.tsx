"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { type MouseEvent, useEffect, useState } from "react";
import { LanguageToggle } from "./language-toggle";

type SectionId = "home" | "about" | "skills" | "projects" | "github" | "contact";

const sectionIdsWithProjects: readonly SectionId[] = ["home", "about", "skills", "projects", "github", "contact"];
const sectionIdsWithoutProjects: readonly SectionId[] = ["home", "about", "skills", "github", "contact"];

type HeaderProps = {
  showProjects?: boolean;
};

export function Header({ showProjects = true }: HeaderProps) {
  const sectionIds = showProjects ? sectionIdsWithProjects : sectionIdsWithoutProjects;
  const t = useTranslations("header");
  const [active, setActive] = useState<SectionId>("home");

  const scrollToSectionById = (id: SectionId) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const offset = headerHeight + 18;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActive(id);
  };

  useEffect(() => {
    if (showProjects || window.location.hash !== "#projects") {
      return;
    }

    const homeSection = document.getElementById("home");
    if (!homeSection) {
      return;
    }

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const offset = headerHeight + 18;
    const top = homeSection.getBoundingClientRect().top + window.scrollY - offset;

    window.history.replaceState(null, "", "#home");
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [showProjects]);

  useEffect(() => {
    const getCurrentSection = () => {
      const headerEl = document.querySelector("header");
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
      const offset = headerHeight + 22;
      const referenceY = offset;

      const metrics = sectionIds
        .map((id) => {
          const section = document.getElementById(id);
          if (!section) return null;
          const rect = section.getBoundingClientRect();
          return {
            id,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter((item): item is { id: SectionId; top: number; bottom: number } => item !== null);

      const containing = metrics
        .filter((item) => item.top <= referenceY && item.bottom > referenceY)
        .sort((a, b) => b.top - a.top);

      if (containing.length > 0) {
        return containing[0].id;
      }

      const next = metrics
        .filter((item) => item.top > referenceY)
        .sort((a, b) => a.top - b.top);

      if (next.length > 0) {
        return next[0].id;
      }

      return metrics.length > 0 ? metrics[metrics.length - 1].id : "home";
    };

    const syncActiveSection = () => {
      setActive(getCurrentSection());
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, [sectionIds]);

  const scrollToSection = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSectionById(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 md:px-5 max-w-280 mx-auto">
      <div className="mx-auto flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 shadow-card backdrop-blur-20 sm:px-5">
        <a
          href="#home"
          onClick={scrollToSection("home")}
          className="bg-text-gradient bg-clip-text font-(--font-display) text-sm tracking-wide text-transparent"
        >
          JV.PERAZZO
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollToSection(id)}
              aria-current={active === id ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${active === id ? "bg-primary/25 text-white" : "text-muted hover:text-white"
                }`}
            >
              {t(id)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="order-1 md:order-2">
            <LanguageToggle />
          </div>

          <div className="order-2 md:order-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-foreground shadow-card backdrop-blur-20 transition hover:text-accent md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="z-120 w-56 space-y-2 rounded-2xl border border-[rgba(148,163,184,0.22)] bg-mobile-nav-dropdown p-1.5 shadow-mobile-nav backdrop-blur-22"
              >
                {sectionIds.map((id) => (
                  <DropdownMenuItem
                    key={id}
                    data-active={active === id ? "true" : "false"}
                    aria-current={active === id ? "page" : undefined}
                    className="cursor-pointer rounded-xl border border-white/15 bg-mobile-nav-item px-3 py-2 text-sm text-[rgba(230,237,247,0.9)] outline-none transition data-[highlighted]:border-[rgba(102,225,255,0.28)] data-[highlighted]:bg-mobile-nav-item-highlighted data-[highlighted]:text-white data-[active=true]:border-[rgba(102,225,255,0.3)] data-[active=true]:bg-mobile-nav-item-active data-[active=true]:text-white"
                    onClick={() => scrollToSectionById(id)}
                  >
                    {t(id)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
