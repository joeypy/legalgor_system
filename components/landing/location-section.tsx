import { Car, ExternalLink, MapPin, Navigation } from "lucide-react";

import { directionsUrl, mapEmbedUrl, siteConfig } from "@/lib/site";
import { Reveal } from "./motion-primitives";
import { SectionPill } from "./section-pill";

export function LocationSection() {
  const { contact } = siteConfig;

  return (
    <section id="ubicacion" className="bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-center text-center">
          <SectionPill>Cómo llegar</SectionPill>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Visítanos en nuestras oficinas
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Estamos en Chacao. Traza tu ruta desde donde estés.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
          {/* Details */}
          <Reveal className="flex flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-navy text-white">
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
                <Car className="size-4 text-brand-blue" />
                {contact.parking}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
              <a
                href={directionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-navy/90"
              >
                <Navigation className="size-4" />
                Cómo llegar
              </a>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-brand-navy shadow-sm transition hover:bg-brand-tint"
              >
                <ExternalLink className="size-4" />
                Abrir en Maps
              </a>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-border/60 shadow-xl">
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
