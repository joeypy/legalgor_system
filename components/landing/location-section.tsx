import { Car, ExternalLink, MapPin, Navigation } from "lucide-react";

import { directionsUrl, mapEmbedUrl, siteConfig } from "@/lib/site";
import { Reveal } from "./motion-primitives";
import { SectionPill } from "./section-pill";

export function LocationSection() {
  const { contact } = siteConfig;

  return (
    <section id="ubicacion" className="bg-background py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <SectionPill>Cómo llegar</SectionPill>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Visítanos en nuestras oficinas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Estamos en Chacao. Traza tu ruta desde donde estés.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
          <Reveal className="flex flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-navy text-white">
                <MapPin className="size-5" />
              </span>
              <div>
                <h3 className="font-bold text-brand-navy">Dirección</h3>
                <p className="mt-1 text-sm text-foreground/80">
                  {contact.address}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-border/60 pt-5 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Referencia: </span>
                {contact.reference}
              </p>
              <p className="flex items-center gap-2">
                <Car className="size-4 text-brand-wine" />
                {contact.parking}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row">
              <a
                href={directionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy/90"
              >
                <Navigation className="size-4" />
                Cómo llegar
              </a>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-brand-wine transition hover:bg-brand-tint"
              >
                <ExternalLink className="size-4" />
                Abrir en Maps
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="overflow-hidden rounded-3xl border border-border/70 shadow-sm"
          >
            <iframe
              title="Ubicación de LegalGor"
              src={mapEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full sm:h-full sm:min-h-[420px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
