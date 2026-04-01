import { Contact } from "@/components/contact";
import { GithubActivity } from "@/components/github-activity";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HeroScene } from "@/components/hero-scene";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function PortfolioPage() {
  return (
    <div className="bg-atmosphere min-h-screen pb-12">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HeroScene />
      </div>
      <main className="relative z-10">
        <Header />
        <section className="relative isolate -mt-24 flex min-h-dvh flex-col pt-24 lg:h-dvh lg:overflow-hidden">
          <Hero />
        </section>
        <Skills />
        <Projects />
        <GithubActivity />
        <Contact />
      </main>
    </div>
  );
}
