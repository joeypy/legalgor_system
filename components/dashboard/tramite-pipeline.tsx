import { Check } from "lucide-react";

import { RefStamp } from "@/components/dashboard/ref-stamp";
import { etapas, tramites } from "@/features/tramites/data";
import type { Tramite } from "@/features/tramites/types";
import { cn } from "@/lib/utils";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fechaCorta = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[m - 1]}`;
};

function ProgresoEtapas({ actual }: { actual: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Etapa ${actual + 1} de ${etapas.length}`}>
      {etapas.map((e, i) => (
        <span
          key={e.key}
          className={cn(
            "h-1 flex-1 rounded-full",
            i < actual && "bg-brand-navy",
            i === actual && "bg-brand-blue-bright",
            i > actual && "bg-muted",
          )}
        />
      ))}
    </div>
  );
}

function TramiteCard({ tramite }: { tramite: Tramite }) {
  return (
    <article className="rounded-lg border border-border/70 border-l-2 border-l-brand-kraft bg-card p-3 shadow-xs">
      <p className="truncate text-sm font-medium text-foreground">
        {tramite.cliente}
      </p>
      <div className="mt-1.5 flex items-center gap-2">
        <RefStamp>{tramite.paquete}</RefStamp>
        {tramite.rif && (
          <span className="font-mono text-[0.7rem] text-muted-foreground">
            {tramite.rif}
          </span>
        )}
      </div>
      <div className="mt-3">
        <ProgresoEtapas actual={tramite.etapaActual} />
      </div>
      <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground">
        Inició {fechaCorta(tramite.inicio)}
      </p>
    </article>
  );
}

export function TramitePipeline() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {etapas.map((etapa, i) => {
        const enEtapa = tramites.filter((t) => t.etapaActual === i);
        return (
          <div key={etapa.key} className="flex w-64 shrink-0 flex-col">
            <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand-navy text-[0.65rem] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {etapa.nombre}
                </h3>
              </div>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {enEtapa.length}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {etapa.descripcion}
            </p>

            <div className="mt-3 space-y-2">
              {enEtapa.length > 0 ? (
                enEtapa.map((t) => <TramiteCard key={t.id} tramite={t} />)
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/70 px-3 py-4 text-xs text-muted-foreground/70">
                  <Check className="size-3.5" />
                  Sin trámites
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
