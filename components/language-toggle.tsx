"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "pt" ? "en" : "pt";

  function handleToggle() {
    const parts = pathname.split("/");

    if (parts.length > 1) {
      parts[1] = nextLocale;
      router.replace(parts.join("/"));
      return;
    }

    router.replace(`/${nextLocale}`);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="glass-panel inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-foreground transition-colors hover:border-primary/50 hover:text-white"
      aria-label="Toggle language"
    >
      {locale.toUpperCase()} / {nextLocale.toUpperCase()}
    </button>
  );
}
