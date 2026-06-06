import { RefStamp } from "@/components/dashboard/ref-stamp";
import { SectionHeader } from "@/components/dashboard/section-header";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import {
  formatUsd,
  registrationPackages,
  serviceLines,
} from "@/features/servicios/data";

export default function CatalogoPage() {
  return (
    <>
      <DashboardTopbar title="Catálogo" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <SectionHeader
          title="Servicios y trámites"
          meta="Referencia interna de la oferta de LegalGor"
        />

        {serviceLines.map((line) => (
          <section
            key={line.slug}
            className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm"
          >
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <h2 className="text-sm font-semibold text-foreground">
                {line.title}
              </h2>
              <p className="text-xs text-muted-foreground">{line.tagline}</p>
            </div>

            <div className="divide-y divide-border/60">
              {line.groups.map((group) => (
                <div key={group.title} className="px-5 py-4 sm:px-6">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.title}
                    </h3>
                    {group.ref && <RefStamp>{group.ref}</RefStamp>}
                  </div>
                  <ul className="grid gap-x-6 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between gap-3 py-1.5 text-sm"
                      >
                        <span className="text-foreground/80">{item.label}</span>
                        {item.price != null && (
                          <span className="shrink-0 font-mono text-sm tabular-nums text-brand-navy">
                            {formatUsd(item.price)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Registration packages */}
        <section className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-foreground">
              Paquetes de registro
            </h2>
            <p className="text-xs text-muted-foreground">
              Constitución de compañías · contribuyentes ordinarias
            </p>
          </div>
          <div className="grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {registrationPackages.map((pkg) => (
              <div key={pkg.ref} className="bg-card p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                  <RefStamp>{pkg.ref}</RefStamp>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {pkg.features.slice(0, 4).map((f) => (
                    <li key={f} className="truncate">
                      · {f}
                    </li>
                  ))}
                  {pkg.features.length > 4 && (
                    <li className="text-brand-blue">
                      + {pkg.features.length - 4} más
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
