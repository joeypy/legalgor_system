export interface AutoMessage {
  id: string;
  titulo: string;
  mensaje: string;
}

export interface AIConfig {
  /** File name of the uploaded context PDF (the agent's knowledge base). */
  contextPdfName: string | null;
  systemPrompt: string;
  greeting: string;
  horario: {
    dias: string[]; // active weekdays
    desde: string; // HH:MM
    hasta: string; // HH:MM
  };
  mensajesAutomaticos: AutoMessage[];
}

export const WEEKDAYS = [
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
  "Dom",
] as const;

export const defaultAIConfig: AIConfig = {
  contextPdfName: "LEGALGOR PAQUETES MAYO.pdf",
  systemPrompt:
    "Eres el asistente virtual de LegalGor, una firma venezolana de servicios contables, tributarios y legales. Responde con un tono profesional y cercano. Usa el documento de contexto para dar precios y detalles. Si no tienes la información, ofrece contactar a un asesor.",
  greeting:
    "¡Hola! 👋 Soy el asistente de LegalGor. ¿En qué puedo ayudarte hoy con tus trámites contables o legales?",
  horario: {
    dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
    desde: "08:00",
    hasta: "17:00",
  },
  mensajesAutomaticos: [
    {
      id: "fuera-horario",
      titulo: "Fuera de horario",
      mensaje:
        "Gracias por escribir a LegalGor. En este momento estamos fuera de horario de atención. Te responderemos a primera hora del próximo día hábil.",
    },
    {
      id: "bienvenida",
      titulo: "Bienvenida",
      mensaje:
        "¡Bienvenido a LegalGor! Cuéntanos qué necesitas y con gusto te asesoramos.",
    },
    {
      id: "solicitar-datos",
      titulo: "Solicitar datos",
      mensaje:
        "Para ayudarte mejor, ¿podrías indicarnos el nombre de tu empresa y si eres contribuyente ordinario o especial?",
    },
  ],
};
