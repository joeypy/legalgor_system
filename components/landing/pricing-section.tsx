import { Reveal } from "./motion-primitives";
import { TramitesTabs } from "./tramites-tabs";

export function PricingSection() {
  return (
    <section id="precios" className="bg-brand-tint py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            Trámites individuales
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Precios claros para trámites puntuales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Elige una categoría y consulta cada trámite con su tarifa fija en
            dólares.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <TramitesTabs />
        </Reveal>
      </div>
    </section>
  );
}
