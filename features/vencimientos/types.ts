export type ObligacionTipo =
  | "IVA"
  | "Retención ISLR"
  | "Retención IVA"
  | "Parafiscales"
  | "IGP"
  | "ISLR";

export type FiscalStatus = "al-dia" | "por-vencer" | "vencido";

export interface Obligacion {
  id: string;
  clienteId: string;
  tipo: ObligacionTipo;
  /** Fiscal period, e.g. "1ra quincena Jun 2026" or "Mayo 2026". */
  periodo: string;
  /** Due date, ISO (YYYY-MM-DD). */
  vence: string;
  /** Estimated amount in USD, when known. */
  monto?: number;
}
