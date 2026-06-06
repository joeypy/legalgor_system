import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatUsd } from "@/features/servicios/data";
import {
  statusMeta,
  venceLabel,
  type ObligacionEnriquecida,
} from "@/features/vencimientos/data";
import { cn } from "@/lib/utils";

export function VencimientoRow({ item }: { item: ObligacionEnriquecida }) {
  const meta = statusMeta[item.status];

  return (
    <div className="flex items-center gap-3 py-3">
      <span
        className={cn("size-1.5 shrink-0 rounded-full", meta.dot)}
        aria-hidden
      />

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate text-sm font-medium text-foreground">
          {item.cliente?.nombre ?? "—"}
          <span
            className={cn(
              "shrink-0 rounded px-1 py-px font-mono text-[0.6rem] font-semibold uppercase tracking-wide",
              item.cliente?.regimen === "especial"
                ? "bg-brand-tint text-brand-navy"
                : "bg-muted text-muted-foreground",
            )}
          >
            {item.cliente?.regimen === "especial" ? "ESP" : "ORD"}
          </span>
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {item.tipo} · {item.periodo}
        </p>
      </div>

      <div className="hidden w-28 text-right sm:block">
        {item.monto != null && (
          <p className="font-mono text-sm tabular-nums text-foreground">
            {formatUsd(item.monto)}
          </p>
        )}
        <p className={cn("font-mono text-xs tabular-nums", meta.fg)}>
          {venceLabel(item.vence)}
        </p>
      </div>

      <StatusBadge status={item.status} className="hidden shrink-0 md:inline-flex" />
    </div>
  );
}
