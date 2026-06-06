/** Tax regime — the classification that drives everything (filing cadence, duties). */
export type Regimen = "ordinario" | "especial";

export interface Cliente {
  id: string;
  /** Razón social. */
  nombre: string;
  rif: string;
  regimen: Regimen;
  actividad: string;
  /** Service reference contracted (e.g. "Ref. 100" / "Ref. 180"). */
  plan: string;
  desde: string; // ISO date the client joined
}
