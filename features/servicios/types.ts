/**
 * Domain model for the LegalGor service catalog.
 * Single source of truth consumed by both the landing and the dashboard.
 * Transcribed from the brand assets (assets/) and the "Paquetes" PDF.
 */

export type ServiceLineSlug =
  | "contable-tributario"
  | "servicios-contables"
  | "legal"
  | "tramites-individuales";

export interface ServiceItem {
  label: string;
  /** Price in USD when the asset lists one; otherwise the service is quoted on request. */
  price?: number;
}

export interface ServiceGroup {
  title: string;
  /** Reference code shown on the brand flyers (e.g. "Ref. 100"). */
  ref?: string;
  note?: string;
  items: ServiceItem[];
}

export interface ServiceLine {
  slug: ServiceLineSlug;
  title: string;
  tagline: string;
  /** lucide-react icon name. */
  icon: string;
  groups: ServiceGroup[];
}

export interface RegistrationPackage {
  ref: string;
  name: string;
  /** Constituent-type segment from the flyers. */
  segment: "Ordinarias";
  features: string[];
  note: string;
  highlighted?: boolean;
}
