import { registrationPackages, serviceLines } from "@/features/servicios/data";
import type {
  Channel,
  ChatTool,
  Conversation,
  ServiceCard,
} from "./types";

/** Per-channel identity — brand colour is used as meaning (where the lead came from). */
export const channelMeta: Record<
  Channel,
  { label: string; color: string }
> = {
  whatsapp: { label: "WhatsApp", color: "#25D366" },
  instagram: { label: "Instagram", color: "#E1306C" },
  messenger: { label: "Messenger", color: "#0084FF" },
  telegram: { label: "Telegram", color: "#229ED9" },
  tiktok: { label: "TikTok", color: "#111111" },
};

export const channelOrder: Channel[] = [
  "whatsapp",
  "instagram",
  "messenger",
  "telegram",
  "tiktok",
];

/** Services + packages as shareable cards — what the `enviar_planes_servicios` tool returns. */
export const planesServiciosCards = (): ServiceCard[] => [
  ...serviceLines.map((l) => ({ title: l.title, subtitle: l.tagline })),
  ...registrationPackages
    .slice(0, 3)
    .map((p) => ({
      title: `Paquete ${p.name}`,
      subtitle: "Constitución de compañía",
      badge: p.ref,
    })),
];

/** Tools the AI agent can call. Toggled from Configuración → IA. Extensible. */
export const chatTools: ChatTool[] = [
  {
    id: "enviar_planes_servicios",
    nombre: "Enviar planes y servicios",
    descripcion: "Comparte el catálogo de servicios y paquetes con el contacto.",
    enabled: true,
  },
  {
    id: "enviar_ubicacion",
    nombre: "Enviar ubicación",
    descripcion: "Envía la dirección de la oficina y el enlace de cómo llegar.",
    enabled: true,
  },
  {
    id: "agendar_cita",
    nombre: "Agendar cita",
    descripcion: "Propone horarios disponibles de atención en la oficina.",
    enabled: false,
  },
];

/** Sample multi-channel inbox (demo data). */
export const conversations: Conversation[] = [
  {
    id: "cv-1",
    nombre: "María Fernández",
    channel: "whatsapp",
    preview: "¿Cuánto cuesta constituir una compañía?",
    time: "09:42",
    unread: 2,
    aiActive: true,
    messages: [
      { id: "m1", author: "contacto", kind: "text", text: "Hola, buenos días 👋", time: "09:40" },
      { id: "m2", author: "ia", kind: "text", text: "¡Hola María! Soy el asistente de LegalGor. ¿En qué puedo ayudarte?", time: "09:40" },
      { id: "m3", author: "contacto", kind: "text", text: "¿Cuánto cuesta constituir una compañía?", time: "09:42" },
    ],
  },
  {
    id: "cv-2",
    nombre: "Carlos Méndez",
    channel: "instagram",
    preview: "Vi su publicación sobre declaraciones de IVA",
    time: "09:15",
    unread: 0,
    aiActive: false,
    messages: [
      { id: "m1", author: "contacto", kind: "text", text: "Vi su publicación sobre declaraciones de IVA", time: "09:12" },
      { id: "m2", author: "agente", kind: "text", text: "¡Hola Carlos! Con gusto te explico. ¿Tu empresa es contribuyente ordinario o especial?", time: "09:15" },
    ],
  },
  {
    id: "cv-3",
    nombre: "Andreína Gil",
    channel: "messenger",
    preview: "Necesito sellar mis libros legales",
    time: "Ayer",
    unread: 1,
    aiActive: true,
    messages: [
      { id: "m1", author: "contacto", kind: "text", text: "Necesito sellar mis libros legales", time: "18:30" },
      {
        id: "m2",
        author: "ia",
        kind: "cards",
        text: "Estos son nuestros servicios disponibles:",
        cards: planesServiciosCards().slice(0, 4),
        time: "18:31",
      },
    ],
  },
  {
    id: "cv-4",
    nombre: "José Rivas",
    channel: "telegram",
    preview: "Mensaje de voz",
    time: "Ayer",
    unread: 0,
    aiActive: false,
    messages: [
      { id: "m1", author: "contacto", kind: "text", text: "Buenas, quisiera asesoría contable mensual", time: "16:05" },
      { id: "m2", author: "agente", kind: "text", text: "Claro José, te paso los detalles del plan para contribuyentes ordinarios.", time: "16:10" },
    ],
  },
  {
    id: "cv-5",
    nombre: "Daniela Soto",
    channel: "tiktok",
    preview: "¿Hacen trámites de RIF?",
    time: "Lun",
    unread: 0,
    aiActive: true,
    messages: [
      { id: "m1", author: "contacto", kind: "text", text: "¿Hacen trámites de RIF?", time: "11:20" },
      { id: "m2", author: "ia", kind: "text", text: "¡Sí! El RIF está incluido en varios de nuestros paquetes de registro.", time: "11:20" },
    ],
  },
];
