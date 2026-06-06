import type { Cliente } from "./types";

/** Sample clients for the dashboard shell (demo data). */
export const clientes: Cliente[] = [
  {
    id: "c-001",
    nombre: "Inversiones Caribe, C.A.",
    rif: "J-40551223-8",
    regimen: "especial",
    actividad: "Comercio mayorista",
    plan: "Ref. 180",
    desde: "2024-03-12",
  },
  {
    id: "c-002",
    nombre: "Distribuidora El Ávila, C.A.",
    rif: "J-31228740-1",
    regimen: "especial",
    actividad: "Distribución de alimentos",
    plan: "Ref. 180",
    desde: "2023-11-02",
  },
  {
    id: "c-003",
    nombre: "Constructora Andina, C.A.",
    rif: "J-29887651-0",
    regimen: "ordinario",
    actividad: "Construcción",
    plan: "Ref. 100",
    desde: "2025-01-20",
  },
  {
    id: "c-004",
    nombre: "Servicios Profesionales Galeno",
    rif: "J-50112398-4",
    regimen: "ordinario",
    actividad: "Servicios médicos",
    plan: "Ref. 100",
    desde: "2025-06-30",
  },
  {
    id: "c-005",
    nombre: "Textiles del Centro, C.A.",
    rif: "J-30447712-9",
    regimen: "especial",
    actividad: "Manufactura textil",
    plan: "Ref. 180",
    desde: "2022-08-15",
  },
  {
    id: "c-006",
    nombre: "AgroValles, C.A.",
    rif: "J-41003366-2",
    regimen: "ordinario",
    actividad: "Agroindustria",
    plan: "Ref. 100",
    desde: "2024-09-05",
  },
  {
    id: "c-007",
    nombre: "Tecnología Orinoco, C.A.",
    rif: "J-40998123-7",
    regimen: "ordinario",
    actividad: "Software y servicios TI",
    plan: "Ref. 100",
    desde: "2025-04-18",
  },
  {
    id: "c-008",
    nombre: "Farmacia La Trinidad",
    rif: "J-31556209-3",
    regimen: "especial",
    actividad: "Comercio farmacéutico",
    plan: "Ref. 180",
    desde: "2023-02-27",
  },
];

export const clienteById = (id: string) => clientes.find((c) => c.id === id);
