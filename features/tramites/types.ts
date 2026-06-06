export interface EtapaDef {
  key: string;
  nombre: string;
  /** Short helper shown under the stage column header. */
  descripcion: string;
}

export interface Tramite {
  id: string;
  cliente: string;
  rif?: string;
  /** Registration package contracted (e.g. "Ref. 310"). */
  paquete: string;
  /** Index into `etapas`. Equals etapas.length when finished. */
  etapaActual: number;
  inicio: string; // ISO date
}
