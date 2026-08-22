import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RefStamp } from "@/components/dashboard/ref-stamp";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatusRibbon } from "@/components/dashboard/status-ribbon";
import { VencimientoRow } from "@/components/dashboard/vencimiento-row";
import { adminPaths } from "@/lib/app-paths";
import { etapas, tramitesActivos } from "@/features/tramites/data";
import { obligacionesEnriquecidas } from "@/features/vencimientos/data";
import { cn } from "@/lib/utils";

export default function HoyPage() {
  const proximos = obligacionesEnriquecidas().slice(0, 6);
  const enCurso = tramitesActivos().slice(0, 5);

  return (
    <>
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <StatusRibbon />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Próximos vencimientos — most urgent first */}
          <section className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
            <SectionHeader
              title="Próximos vencimientos"
              meta="Ordenados por urgencia"
            >
              <Link
                href={adminPaths.vencimientos}
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
              >
                Ver todos
                <ArrowRight className="size-3.5" />
              </Link>
            </SectionHeader>
            <div className="mt-2 divide-y divide-border/60">
              {proximos.map((item) => (
                <VencimientoRow key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Trámites en curso — compact pipeline state */}
          <section className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
            <SectionHeader title="Trámites en curso">
              <Link
                href={adminPaths.tramites}
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
              >
                Pipeline
                <ArrowRight className="size-3.5" />
              </Link>
            </SectionHeader>
            <ul className="mt-4 space-y-4">
              {enCurso.map((t) => (
                <li key={t.id}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {t.cliente}
                    </p>
                    <RefStamp>{t.paquete}</RefStamp>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    {etapas.map((e, i) => (
                      <span
                        key={e.key}
                        className={cn(
                          "h-1 flex-1 rounded-full",
                          i < t.etapaActual && "bg-brand-navy",
                          i === t.etapaActual && "bg-brand-blue-bright",
                          i > t.etapaActual && "bg-muted",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {etapas[t.etapaActual]?.nombre}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
