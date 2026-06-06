import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { Reveal } from "./motion-primitives";
import { WaveDivider } from "./wave-divider";

const stats = [
  { value: "4", label: "Líneas de servicio" },
  { value: "+20", label: "Trámites y declaraciones" },
  { value: "100%", label: "Atención personalizada" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-deep text-white">
      {/* Brand backdrop: navy gradient + faint building grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(125%_125%_at_85%_0%,oklch(0.45_0.16_264/0.55)_0%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:46px_46px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-28 lg:pt-24">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-brand-blue-bright/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/20">
            {siteConfig.tagline}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Soluciones contables, tributarias y legales para tu empresa
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-navy hover:bg-white/90"
            >
              <a href="#contacto">
                Solicitar asesoría
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#paquetes">
                Ver detalles de nuestros planes
                <ChevronRight className="size-4" />
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-extrabold text-white">{s.value}</dd>
                <p className="mt-1 text-xs font-medium text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Brand card — echoes the flyer "Ref." pill composition */}
        <Reveal delay={0.15} className="relative hidden lg:block">
          <div className="absolute -right-6 -top-6 size-40 rounded-full bg-brand-blue-bright/30 blur-2xl" />
          <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Paquetes de registro
            </p>
            <p className="mt-3 text-2xl font-bold leading-snug">
              Constituye tu compañía con acompañamiento de principio a fin.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {[
                "Documento constitutivo e inventario de apertura",
                "Gestiones ante el SAREN",
                "RIF, publicación mercantil e inscripciones",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-sky" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="#paquetes"
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-navy transition hover:bg-white/90"
            >
              Ver paquetes
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <WaveDivider />
    </section>
  );
}
