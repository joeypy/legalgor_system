"use client";

import { useMemo, useState } from "react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { VencimientoRow } from "@/components/dashboard/vencimiento-row";
import { obligacionesEnriquecidas, resumenFiscal } from "@/features/vencimientos/data";
import type { FiscalStatus } from "@/features/vencimientos/types";
import { cn } from "@/lib/utils";

type Filtro = "todos" | FiscalStatus;

export default function VencimientosPage() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const all = useMemo(() => obligacionesEnriquecidas(), []);
  const r = resumenFiscal();

  const filtros: { key: Filtro; label: string; count: number }[] = [
    { key: "todos", label: "Todos", count: r.total },
    { key: "vencido", label: "Vencido", count: r.vencido.count },
    { key: "por-vencer", label: "Por vencer", count: r.porVencer.count },
    { key: "al-dia", label: "Al día", count: r.alDia.count },
  ];

  const items = filtro === "todos" ? all : all.filter((o) => o.status === filtro);

  return (
    <>
      <div className="flex-1 space-y-5 p-4 sm:p-6">
        <SectionHeader
          title="Obligaciones fiscales"
          meta="Declaraciones y retenciones por cliente"
        />

        {/* Filter — fast triage by status */}
        <div className="inline-flex rounded-lg border border-border bg-card p-1 shadow-xs">
          {filtros.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFiltro(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                filtro === f.key
                  ? "bg-brand-navy text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  filtro === f.key ? "text-white/70" : "text-muted-foreground/70",
                )}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border/70 bg-card px-5 shadow-sm sm:px-6">
          <div className="divide-y divide-border/60">
            {items.map((item) => (
              <VencimientoRow key={item.id} item={item} />
            ))}
            {items.length === 0 && (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Sin obligaciones en este estado.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
