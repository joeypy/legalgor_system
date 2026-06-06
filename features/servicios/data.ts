import type { RegistrationPackage, ServiceLine } from "./types";

/** Service lines, transcribed from the LegalGor brand assets. */
export const serviceLines: ServiceLine[] = [
  {
    slug: "contable-tributario",
    title: "Contable y Tributario",
    tagline: "Contabilidad, estados financieros y cumplimiento tributario.",
    icon: "Calculator",
    groups: [
      {
        title: "Servicios",
        items: [
          { label: "Servicios de contabilidad (contribuyentes ordinarios y especiales)" },
          { label: "Elaboración de estados financieros" },
          { label: "Elaboración de inventario" },
          { label: "Cartas de aceptación de comisario" },
          { label: "Declaración ISLR" },
          { label: "Declaración ISLR estimado" },
          { label: "Declaración IGP" },
          { label: "Certificación de ingresos" },
          { label: "Balances personales" },
          { label: "Inscripciones parafiscales" },
        ],
      },
    ],
  },
  {
    slug: "servicios-contables",
    title: "Servicios Contables",
    tagline: "Planes mensuales para contribuyentes ordinarios y especiales.",
    icon: "ReceiptText",
    groups: [
      {
        title: "Contribuyentes ordinarios",
        ref: "Ref. 100",
        items: [
          { label: "Declaración de IVA (mensual)" },
          { label: "Declaración de retenciones de ISLR" },
          { label: "Declaración y movimientos parafiscales" },
          { label: "Elaboración de libros compra-venta" },
          { label: "Elaboración de comprobantes de retención de ISLR" },
          { label: "Elaboración de balance de comprobación (mensual)" },
          { label: "Llenado de libros legales" },
          { label: "Asesoría contable (mensual)" },
          { label: "Gestión de pagos de impuestos" },
        ],
      },
      {
        title: "Contribuyentes especiales",
        ref: "Ref. 180",
        items: [
          { label: "Declaración de IVA (quincenal)" },
          { label: "Declaración de retenciones de ISLR (mensual)" },
          { label: "Declaración de retenciones de IVA" },
          { label: "Declaración y movimientos parafiscales" },
          { label: "Declaración IGP" },
          { label: "Elaboración de libros compra-venta" },
          { label: "Elaboración de comprobantes de IVA y ISLR" },
          { label: "Emisión de balances de comprobación (quincenal)" },
          { label: "Gestión de pagos de impuestos" },
          { label: "Llenado de libros legales" },
          { label: "Asesoría contable (mensual)" },
        ],
      },
    ],
  },
  {
    slug: "legal",
    title: "Legal",
    tagline: "Constitución de compañías y trámites jurídicos.",
    icon: "Scale",
    groups: [
      {
        title: "Servicios",
        items: [
          { label: "Constitución de compañías" },
          { label: "Actas de asamblea" },
          { label: "Sellado de libros legales" },
          { label: "Trámites de compra-venta" },
          { label: "Poderes" },
          { label: "Contratos de arrendamiento" },
          { label: "Cesiones de derecho" },
        ],
      },
    ],
  },
  {
    slug: "tramites-individuales",
    title: "Trámites Individuales",
    tagline: "Libros legales, inscripciones y extras con precio fijo.",
    icon: "FileStack",
    groups: [
      {
        title: "Libros legales",
        items: [
          { label: "5 Libros Forma Manual", price: 75 },
          { label: "5 Libros Forma Libre", price: 130 },
          { label: "5 Libros Forma Continua", price: 150 },
        ],
      },
      {
        title: "Entes gubernamentales",
        items: [
          { label: "IVSS", price: 80 },
          { label: "FAOV", price: 60 },
          { label: "INCES", price: 40 },
          { label: "RUPDAE", price: 40 },
          { label: "MPPPST", price: 70 },
          { label: "FONA", price: 50 },
          { label: "LOCTI", price: 30 },
          { label: "RNC", price: 120 },
        ],
      },
      {
        title: "Trámite de poderes",
        items: [{ label: "Poder", price: 150 }],
      },
      {
        title: "Extras",
        items: [
          { label: "Sellos automáticos", price: 20 },
          { label: "Talonario de factura media carta", price: 25 },
          { label: "Talonario media carta papel químico", price: 30 },
          { label: "Talonario tamaño carta", price: 35 },
          { label: "Talonario tamaño carta papel químico", price: 40 },
        ],
      },
    ],
  },
];

/**
 * Company-registration packages (segment "Ordinarias"), transcribed from
 * "LEGALGOR PAQUETES MAYO.pdf". Codes are reference numbers, not prices.
 */
export const registrationPackages: RegistrationPackage[] = [
  {
    ref: "Ref. 200",
    name: "Promocional",
    segment: "Ordinarias",
    features: [
      "Documento Constitutivo",
      "Inventario de Apertura",
      "Carta de Aceptación de Comisario",
      "Gestiones ante el SAREN",
    ],
    note: "No incluye Impuestos del SAREN, Tasas ni Timbres Fiscales.",
  },
  {
    ref: "Ref. 250",
    name: "Básico",
    segment: "Ordinarias",
    features: [
      "Documento Constitutivo",
      "Inventario de Apertura",
      "Carta de Aceptación de Comisario",
      "RIF y publicación Mercantil",
      "Gestiones ante el SAREN",
    ],
    note: "No incluye Impuestos del SAREN, Tasas ni Timbres Fiscales.",
  },
  {
    ref: "Ref. 310",
    name: "Full",
    segment: "Ordinarias",
    features: [
      "Documento Constitutivo",
      "Inventario de Apertura",
      "Carta de Aceptación de Comisario",
      "RIF",
      "Inscripción ante INCES y FAOV",
      "Publicación Mercantil",
      "Gestiones ante el Sistema SAREN",
    ],
    note: "No incluye Impuestos del SAREN, Tasas ni Timbres Fiscales.",
    highlighted: true,
  },
  {
    ref: "Ref. 650",
    name: "Premium PLUS",
    segment: "Ordinarias",
    features: [
      "Documento Constitutivo",
      "Inventario de Apertura",
      "Carta de Aceptación de Comisario",
      "RIF",
      "Inscripción ante IVSS, FAOV, INCES, RUPDAE, MPPPST, LOCTI y FONA",
      "Publicación Mercantil + Sello Automático",
      "5 libros con libros manuales y Talonario de Factura Media Carta",
    ],
    note: "No incluye Impuestos del SAREN, Tasas ni Timbres Fiscales.",
  },
  {
    ref: "Ref. 690",
    name: "Premium PLUS",
    segment: "Ordinarias",
    features: [
      "Documento Constitutivo",
      "Inventario de Apertura",
      "Carta de Aceptación de Comisario",
      "RIF y Publicación Mercantil",
      "INCES, FAOV, IVSS, RUPDAE, MPPPST, LOCTI y FONA",
      "Sello Automático, 5 libros Forma Libre y Talonario de Factura Media Carta",
      "Gestiones ante el Sistema SAREN",
    ],
    note: "No incluye Impuestos del SAREN, Tasas ni Timbres Fiscales.",
  },
  {
    ref: "Ref. 720",
    name: "Premium PLUS",
    segment: "Ordinarias",
    features: [
      "Documento Constitutivo",
      "Inventario de Apertura",
      "Carta de Aceptación de Comisario",
      "RIF y Publicación Mercantil",
      "INCES, FAOV, IVSS, RUPDAE, MPPPST, LOCTI y FONA",
      "Sello Automático, 5 libros Forma Continua y Talonario de Factura Media Carta",
      "Gestiones ante el Sistema SAREN",
    ],
    note: "No incluye Impuestos del SAREN, Tasas ni Timbres Fiscales.",
  },
];

export const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

/** URL slug for a package = its numeric Ref code (e.g. "Ref. 310" -> "310"). */
export const packageSlug = (ref: string) => ref.replace(/\D/g, "");

export const registrationPackageBySlug = (slug: string) =>
  registrationPackages.find((p) => packageSlug(p.ref) === slug);
