import { formatUsd } from "@/features/servicios/data";
import { resumenFiscal } from "@/features/vencimientos/data";
import { cn } from "@/lib/utils";

const segments = [
  { key: "vencido", label: "Vencido", bar: "bg-status-late", dot: "bg-status-late", fg: "text-status-late" },
  { key: "por-vencer", label: "Por vencer", bar: "bg-status-warn", dot: "bg-status-warn", fg: "text-status-warn" },
  { key: "al-dia", label: "Al día", bar: "bg-status-ok", dot: "bg-status-ok", fg: "text-status-ok" },
] as const;

export function StatusRibbon() {
  const r = resumenFiscal();
  const data = {
    vencido: r.vencido,
    "por-vencer": r.porVencer,
    "al-dia": r.alDia,
  };
  const total = Math.max(r.total, 1);

  const urgentes = r.vencido.count + r.porVencer.count;

  return (
    <section className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm text-muted-foreground">
          Atención fiscal de la quincena
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {urgentes}
          </span>{" "}
          de{" "}
          <span className="font-mono tabular-nums">{r.total}</span> requieren
          acción
        </p>
      </div>

      {/* Proportion bar — the mix at a glance, not a number-on-label */}
      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-muted">
        {segments.map((s) => {
          const count = data[s.key].count;
          if (count === 0) return null;
          return (
            <div
              key={s.key}
              className={cn(s.bar, "transition-all")}
              style={{ width: `${(count / total) * 100}%` }}
            />
          );
        })}
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
        {segments.map((s) => {
          const d = data[s.key];
          return (
            <div
              key={s.key}
              className="flex items-baseline justify-between border-t border-border/60 pt-3 sm:block sm:border-0 sm:pt-0"
            >
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className={cn("size-1.5 rounded-full", s.dot)} />
                {s.label}
              </dt>
              <dd className="flex items-baseline gap-2 sm:mt-1">
                <span
                  className={cn(
                    "font-mono text-2xl font-semibold tabular-nums",
                    d.count > 0 ? s.fg : "text-muted-foreground/50",
                  )}
                >
                  {d.count}
                </span>
                {d.monto > 0 && (
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {formatUsd(d.monto)}
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
