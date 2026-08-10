import {
  ArrowRight,
  Calculator,
  FileStack,
  ReceiptText,
  Scale,
  type LucideIcon,
} from "lucide-react";

import { serviceLines } from "@/features/servicios/data";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  ReceiptText,
  Scale,
  FileStack,
};

const serviceCopy: Record<string, string> = {
  "contable-tributario":
    "Estados financieros, declaraciones y cumplimiento tributario para ordinarios y especiales.",
  "servicios-contables":
    "Planes mensuales de contabilidad, IVA, retenciones, libros y asesoría continua.",
  legal:
    "Constitución de compañías, actas, poderes, contratos y trámites jurídicos.",
  "tramites-individuales":
    "Libros legales, inscripciones y gestiones puntuales con tarifas claras.",
};

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-background py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            Servicios
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Lo que hacemos por tu empresa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Cuatro líneas de servicio para acompañarte desde la constitución
            hasta el cumplimiento fiscal diario.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceLines.map((line) => {
            const Icon = iconMap[line.icon] ?? FileStack;
            const description = serviceCopy[line.slug] ?? line.tagline;

            return (
              <StaggerItem key={line.slug} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-md sm:p-8">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-navy text-white transition-colors group-hover:bg-brand-blue">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-7 text-lg font-extrabold leading-snug tracking-tight text-brand-navy">
                    {line.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <a
                    href="#precios"
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:gap-2.5"
                  >
                    Ver más
                    <ArrowRight className="size-4" />
                  </a>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
