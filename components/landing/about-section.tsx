import { Compass, Target } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";
import { SectionPill } from "./section-pill";

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-brand-tint py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-center text-center">
          <SectionPill>Nosotros</SectionPill>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Comprometidos con tu crecimiento
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <article className="h-full rounded-2xl bg-card p-8 shadow-xl">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-navy text-white">
                <Target className="size-6" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-brand-navy">Misión</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {siteConfig.mission}
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="h-full rounded-2xl bg-card p-8 shadow-xl">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-blue text-white">
                <Compass className="size-6" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-brand-navy">Visión</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {siteConfig.vision}
              </p>
            </article>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
