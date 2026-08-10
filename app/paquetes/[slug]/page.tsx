import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { WhatsappIcon } from "@/components/brand/icons";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import {
  formatUsd,
  packagePrice,
  registrationPackageBySlug,
  registrationPackages,
} from "@/features/servicios/data";
import { etapas } from "@/features/tramites/data";
import { whatsappUrl } from "@/lib/site";

export function generateStaticParams() {
  return registrationPackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = registrationPackageBySlug(slug);
  return {
    title: pkg ? `Paquete ${pkg.name}` : "Paquete",
  };
}

export default async function PaqueteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = registrationPackageBySlug(slug);
  if (!pkg) notFound();

  const price = packagePrice(pkg.ref);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-brand-navy-deep text-white">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <Link
              href="/#paquetes"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Todos los paquetes
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sky">
                {pkg.segment}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-bold text-white ring-1 ring-inset ring-white/20">
                {pkg.ref}
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Paquete {pkg.name}
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              Constitución de compañía para contribuyentes{" "}
              {pkg.segment.toLowerCase()}, con acompañamiento en cada gestión.
            </p>
            <p className="mt-8 font-mono text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl md:text-7xl">
              {formatUsd(price)}
            </p>
            <p className="mt-2 text-sm text-white/55">
              Precio del paquete · no incluye impuestos del SAREN, tasas ni
              timbres fiscales
            </p>
          </div>
        </section>

        <section className="bg-background py-14 sm:py-16">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-brand-navy">Qué incluye</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 rounded-2xl bg-brand-tint px-4 py-3 text-xs leading-relaxed text-brand-navy">
                {pkg.note}
              </p>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
                <p className="font-mono text-4xl font-extrabold tabular-nums text-brand-navy sm:text-5xl">
                  {formatUsd(price)}
                </p>
                <h3 className="mt-4 text-base font-bold text-brand-navy">
                  ¿Te interesa?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cotiza el paquete {pkg.name} por WhatsApp y te guiamos en el
                  proceso.
                </p>
                <Button
                  asChild
                  className="mt-5 w-full rounded-full bg-brand-navy text-white hover:bg-brand-navy/90"
                >
                  <a
                    href={whatsappUrl(
                      undefined,
                      `Hola LegalGor, me interesa el paquete ${pkg.name} (${pkg.ref}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappIcon className="size-4" />
                    Cotizar por WhatsApp
                  </a>
                </Button>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
                <h3 className="text-base font-bold text-brand-navy">
                  Cómo es el proceso
                </h3>
                <ol className="mt-4 space-y-3">
                  {etapas.map((e, i) => (
                    <li key={e.key} className="flex items-start gap-3 text-sm">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint font-mono text-xs font-bold text-brand-navy">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{e.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          {e.descripcion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
