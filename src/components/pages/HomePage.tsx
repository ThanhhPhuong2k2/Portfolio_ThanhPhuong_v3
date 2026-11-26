import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import type { Locale } from "@/content/site";
import { localePath, otherLocale } from "@/lib/i18n";

interface HomePageProps {
  locale: Locale;
}

/** Home: hero, projects, skills and journey built; the other sections arrive one per gate. */
export function HomePage({ locale }: HomePageProps) {
  return (
    <PageShell locale={locale} alternateHref={localePath(otherLocale(locale))}>
      <Hero locale={locale} />
      <Projects locale={locale} />
      <Skills locale={locale} />
      <Journey locale={locale} />
    </PageShell>
  );
}
