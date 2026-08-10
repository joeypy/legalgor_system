export type Channel =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "telegram"
  | "tiktok";

export type MessageKind = "text" | "image" | "video" | "audio" | "cards";

/** Who sent it: the contact, a human agent, or the AI agent (ManyChat). */
export type MessageAuthor = "contacto" | "agente" | "ia";

export interface ServiceCard {
  title: string;
  subtitle?: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  kind: MessageKind;
  text?: string;
  /** Object URL (attachments) or asset path for media. */
  url?: string;
  fileName?: string;
  cards?: ServiceCard[];
  time: string;
}

export interface Conversation {
  id: string;
  nombre: string;
  channel: Channel;
  preview: string;
  time: string;
  unread: number;
  /** Whether the AI agent is currently handling this thread. */
  aiActive: boolean;
  messages: ChatMessage[];
}

/** A capability the AI model can invoke via function-calling. Extensible. */
export interface ChatTool {
  id: string;
  nombre: string;
  descripcion: string;
  enabled: boolean;
}
