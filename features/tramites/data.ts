import type { EtapaDef, Tramite } from "./types";

/** The company-registration pipeline, in order. */
export const etapas: EtapaDef[] = [
  { key: "constitutivo", nombre: "Constitutivo", descripcion: "Documento, inventario y comisario" },
  { key: "saren", nombre: "SAREN", descripcion: "Gestión y registro mercantil" },
  { key: "rif", nombre: "RIF / Publicación", descripcion: "RIF y publicación mercantil" },
  { key: "inscripciones", nombre: "Inscripciones", descripcion: "INCES, FAOV, IVSS y otros entes" },
  { key: "cierre", nombre: "Cierre", descripcion: "Libros, sellos y entrega" },
];

/** Sample registration trámites in progress (demo data). */
export const tramites: Tramite[] = [
  { id: "t-01", cliente: "Comercial Los Andes, C.A.", rif: "J-50448120-1", paquete: "Ref. 310", etapaActual: 3, inicio: "2026-05-12" },
  { id: "t-02", cliente: "Inversiones Delta, C.A.", paquete: "Ref. 250", etapaActual: 1, inicio: "2026-05-28" },
  { id: "t-03", cliente: "Grupo Mariño, C.A.", rif: "J-41220987-6", paquete: "Ref. 690", etapaActual: 4, inicio: "2026-04-30" },
  { id: "t-04", cliente: "Servicios Litoral, C.A.", paquete: "Ref. 200", etapaActual: 0, inicio: "2026-06-03" },
  { id: "t-05", cliente: "Transporte Guayana, C.A.", rif: "J-31889204-0", paquete: "Ref. 720", etapaActual: 2, inicio: "2026-05-19" },
  { id: "t-06", cliente: "Boutique Carabobo", paquete: "Ref. 250", etapaActual: 1, inicio: "2026-06-01" },
];

export const tramitesPorEtapa = (etapaIndex: number) =>
  tramites.filter((t) => t.etapaActual === etapaIndex);

export const tramitesActivos = () =>
  tramites.filter((t) => t.etapaActual < etapas.length);
