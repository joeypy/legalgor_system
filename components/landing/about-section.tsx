import { Compass, Target } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";
import { SectionPill } from "./section-pill";

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-background py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <SectionPill>Nosotros</SectionPill>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Comprometidos con tu crecimiento
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
          <StaggerItem>
            <article className="h-full rounded-3xl border border-border/70 bg-card p-8 shadow-sm md:p-10">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-navy text-white">
                <Target className="size-5" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-brand-navy">
                Misión
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                {siteConfig.mission}
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="h-full rounded-3xl border border-border/70 bg-card p-8 shadow-sm md:p-10">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-navy text-white">
                <Compass className="size-5" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-brand-navy">
                Visión
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                {siteConfig.vision}
              </p>
            </article>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
