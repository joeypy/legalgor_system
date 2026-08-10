export interface ContactInfo {
  whatsapp: string; // display, e.g. "+58 424-1543269"
  instagram: string; // full URL
  email: string;
  address: string;
  reference: string;
  parking: string;
  mapsUrl: string;
}

export const defaultContact: ContactInfo = {
  whatsapp: "+58 424-1543269",
  instagram: "https://www.instagram.com/legalgor/",
  email: "contacto@legalgor.com",
  address:
    'Chacao. Multicentro Empresarial del Este. Torre Miranda, núcleo "B", piso 9, oficina B-97. Entrada por la Av. Francisco de Miranda.',
  reference: 'Entre el Banco Exterior y la entrada del "Colegio Libertador".',
  parking: "Cuenta con estacionamiento.",
  mapsUrl: "https://maps.app.goo.gl/spi36aFvb9YZPRhg9",
};

/** Build a wa.me link from a display phone, with an optional prefilled message. */
export const whatsappUrl = (
  phone: string = defaultContact.whatsapp,
  message = "Hola LegalGor, quisiera solicitar asesoría.",
) => {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

/** Instagram handle (@legalgor) derived from the profile URL. */
export const instagramHandle = (url: string = defaultContact.instagram) =>
  "@" + url.replace(/\/+$/, "").split("/").pop();

/**
 * Google Maps directions to the office — Google uses the visitor's current
 * location as the origin when opened.
 */
export const directionsUrl = (address: string = defaultContact.address) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

/** Embeddable Google Maps URL (no API key needed) for an <iframe>. */
export const mapEmbedUrl = (address: string = defaultContact.address) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;

export const siteConfig = {
  name: "LegalGor",
  legalName: "LegalGor",
  tagline: "Asesoría contable, tributaria y legal",
  description:
    "Brindamos una atención personalizada que complementa nuestro servicio de calidad, aportando soluciones a las necesidades de empresarios y emprendedores.",
  mission:
    "Brindar una atención personalizada, que complemente nuestro servicio de calidad proporcionando así soluciones a tus necesidades.",
  vision:
    "Aportar al desarrollo del país apoyando a empresarios y emprendedores a construir un futuro brillante.",
  contact: defaultContact,
  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Precios", href: "#precios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
