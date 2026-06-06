import {
  Calculator,
  Check,
  FileStack,
  ReceiptText,
  Scale,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serviceLines } from "@/features/servicios/data";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";
import { SectionPill } from "./section-pill";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  ReceiptText,
  Scale,
  FileStack,
};

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-center text-center">
          <SectionPill>Servicios</SectionPill>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Todo lo contable, tributario y legal en un solo lugar
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Acompañamos a empresarios y emprendedores con servicios integrales
            adaptados a contribuyentes ordinarios y especiales.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {serviceLines.map((line) => {
            const Icon = iconMap[line.icon] ?? FileStack;
            const items = line.groups.flatMap((g) => g.items);
            const preview = items.slice(0, 6);

            return (
              <StaggerItem key={line.slug} className="h-full">
              <Card
                className="group h-full border-border/70 shadow-md transition-shadow hover:shadow-xl"
              >
                <CardHeader className="flex flex-row items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-navy text-white transition-transform group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy">
                      {line.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {line.tagline}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {preview.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                  {items.length > preview.length && (
                    <p className="mt-4 text-sm font-medium text-brand-blue">
                      + {items.length - preview.length} servicios más
                    </p>
                  )}
                </CardContent>
              </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
