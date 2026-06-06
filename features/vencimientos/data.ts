import { clienteById } from "@/features/clientes/data";
import type { Cliente } from "@/features/clientes/types";
import type { FiscalStatus, Obligacion } from "./types";

/**
 * Demo "today" — fixed so the dashboard is deterministic. We're in the
 * 1st quincena of June 2026 (1–15 jun).
 */
export const TODAY = "2026-06-06";

const MS_DAY = 86_400_000;

const toUtc = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

export const daysUntil = (due: string, today: string = TODAY) =>
  Math.round((toUtc(due) - toUtc(today)) / MS_DAY);

export const fiscalStatus = (due: string, today: string = TODAY): FiscalStatus => {
  const d = daysUntil(due, today);
  if (d < 0) return "vencido";
  if (d <= 5) return "por-vencer";
  return "al-dia";
};

export const venceLabel = (due: string, today: string = TODAY) => {
  const d = daysUntil(due, today);
  if (d === 0) return "vence hoy";
  if (d === 1) return "vence mañana";
  if (d > 1) return `en ${d} días`;
  if (d === -1) return "venció ayer";
  return `venció hace ${Math.abs(d)} días`;
};

export const statusMeta: Record<
  FiscalStatus,
  { label: string; fg: string; bg: string; dot: string }
> = {
  "al-dia": {
    label: "Al día",
    fg: "text-status-ok",
    bg: "bg-status-ok-soft",
    dot: "bg-status-ok",
  },
  "por-vencer": {
    label: "Por vencer",
    fg: "text-status-warn",
    bg: "bg-status-warn-soft",
    dot: "bg-status-warn",
  },
  vencido: {
    label: "Vencido",
    fg: "text-status-late",
    bg: "bg-status-late-soft",
    dot: "bg-status-late",
  },
};

/** Sample obligations for the 1ra quincena de junio 2026 (demo data). */
export const obligaciones: Obligacion[] = [
  // Vencidas
  { id: "o-01", clienteId: "c-005", tipo: "Retención IVA", periodo: "2da quincena May 2026", vence: "2026-06-02", monto: 1240 },
  { id: "o-02", clienteId: "c-006", tipo: "Parafiscales", periodo: "Mayo 2026", vence: "2026-06-04", monto: 320 },
  // Por vencer (≤ 5 días)
  { id: "o-03", clienteId: "c-001", tipo: "IVA", periodo: "1ra quincena Jun 2026", vence: "2026-06-08", monto: 2980 },
  { id: "o-04", clienteId: "c-002", tipo: "Retención ISLR", periodo: "Mayo 2026", vence: "2026-06-09", monto: 760 },
  { id: "o-05", clienteId: "c-008", tipo: "IVA", periodo: "1ra quincena Jun 2026", vence: "2026-06-10", monto: 1510 },
  { id: "o-06", clienteId: "c-003", tipo: "IVA", periodo: "Mayo 2026", vence: "2026-06-11", monto: 890 },
  // Al día (> 5 días)
  { id: "o-07", clienteId: "c-005", tipo: "IVA", periodo: "1ra quincena Jun 2026", vence: "2026-06-15", monto: 3120 },
  { id: "o-08", clienteId: "c-004", tipo: "Retención ISLR", periodo: "Mayo 2026", vence: "2026-06-16", monto: 410 },
  { id: "o-09", clienteId: "c-007", tipo: "Parafiscales", periodo: "Mayo 2026", vence: "2026-06-18", monto: 280 },
  { id: "o-10", clienteId: "c-002", tipo: "IVA", periodo: "1ra quincena Jun 2026", vence: "2026-06-15", monto: 2640 },
  { id: "o-11", clienteId: "c-006", tipo: "IGP", periodo: "Mayo 2026", vence: "2026-06-22", monto: 150 },
];

export interface ObligacionEnriquecida extends Obligacion {
  cliente?: Cliente;
  status: FiscalStatus;
  dias: number;
}

export const obligacionesEnriquecidas = (): ObligacionEnriquecida[] =>
  obligaciones
    .map((o) => ({
      ...o,
      cliente: clienteById(o.clienteId),
      status: fiscalStatus(o.vence),
      dias: daysUntil(o.vence),
    }))
    .sort((a, b) => a.dias - b.dias);

export const resumenFiscal = () => {
  const items = obligacionesEnriquecidas();
  const count = (s: FiscalStatus) => items.filter((o) => o.status === s).length;
  const sum = (s: FiscalStatus) =>
    items
      .filter((o) => o.status === s)
      .reduce((acc, o) => acc + (o.monto ?? 0), 0);
  return {
    total: items.length,
    vencido: { count: count("vencido"), monto: sum("vencido") },
    porVencer: { count: count("por-vencer"), monto: sum("por-vencer") },
    alDia: { count: count("al-dia"), monto: sum("al-dia") },
  };
};
