"use client";

import { useRef, useState } from "react";
import {
  Check,
  FileText,
  Plus,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chatTools } from "@/features/chat/data";
import type { ChatTool } from "@/features/chat/types";
import {
  defaultAIConfig,
  WEEKDAYS,
  type AIConfig,
} from "@/features/ai/config";
import { cn } from "@/lib/utils";

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function AIConfig() {
  const [config, setConfig] = useState<AIConfig>(defaultAIConfig);
  const [tools, setTools] = useState<ChatTool[]>(chatTools);
  const [saved, setSaved] = useState(false);
  const pdfRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof AIConfig>(key: K, value: AIConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }));
    setSaved(false);
  };

  const toggleDay = (day: string) =>
    set("horario", {
      ...config.horario,
      dias: config.horario.dias.includes(day)
        ? config.horario.dias.filter((d) => d !== day)
        : [...config.horario.dias, day],
    });

  const updateMsg = (id: string, field: "titulo" | "mensaje", value: string) =>
    set(
      "mensajesAutomaticos",
      config.mensajesAutomaticos.map((m) =>
        m.id === id ? { ...m, [field]: value } : m,
      ),
    );

  const addMsg = () =>
    set("mensajesAutomaticos", [
      ...config.mensajesAutomaticos,
      { id: `msg-${Date.now()}`, titulo: "", mensaje: "" },
    ]);

  const removeMsg = (id: string) =>
    set(
      "mensajesAutomaticos",
      config.mensajesAutomaticos.filter((m) => m.id !== id),
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
      className="space-y-5"
    >
      <div className="flex items-start gap-3 rounded-lg border border-brand-blue/20 bg-brand-tint px-4 py-3 text-sm text-brand-navy">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-brand-blue" />
        <p>
          Configura el agente que responde en los chats. La persistencia y la
          conexión real con el modelo requieren un backend (pendiente).
        </p>
      </div>

      {/* Context PDF */}
      <Panel
        title="Documento de contexto"
        description="El PDF que el agente usa como base de conocimiento."
      >
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-status-late-soft text-status-late">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {config.contextPdfName ?? "Sin documento cargado"}
              </p>
              <p className="text-xs text-muted-foreground">
                {config.contextPdfName ? "PDF cargado" : "Sube un PDF de contexto"}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => pdfRef.current?.click()}
            className="shrink-0 gap-1.5"
          >
            <Upload className="size-4" />
            {config.contextPdfName ? "Reemplazar" : "Subir"}
          </Button>
          <input
            ref={pdfRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) =>
              set("contextPdfName", e.target.files?.[0]?.name ?? config.contextPdfName)
            }
          />
        </div>
      </Panel>

      {/* Prompts */}
      <Panel title="Prompts" description="Instrucciones y saludo del agente.">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="systemPrompt">Prompt del sistema</Label>
            <Textarea
              id="systemPrompt"
              rows={4}
              value={config.systemPrompt}
              onChange={(e) => set("systemPrompt", e.target.value)}
              className="shadow-xs"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="greeting">Mensaje de saludo</Label>
            <Textarea
              id="greeting"
              rows={2}
              value={config.greeting}
              onChange={(e) => set("greeting", e.target.value)}
              className="shadow-xs"
            />
          </div>
        </div>
      </Panel>

      {/* Schedule */}
      <Panel
        title="Horario del agente"
        description="Días y horas en que el agente responde automáticamente."
      >
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map((d) => {
            const on = config.horario.dias.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  on
                    ? "bg-brand-navy text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div className="grid gap-2">
            <Label htmlFor="desde">Desde</Label>
            <Input
              id="desde"
              type="time"
              value={config.horario.desde}
              onChange={(e) =>
                set("horario", { ...config.horario, desde: e.target.value })
              }
              className="w-32 shadow-xs"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hasta">Hasta</Label>
            <Input
              id="hasta"
              type="time"
              value={config.horario.hasta}
              onChange={(e) =>
                set("horario", { ...config.horario, hasta: e.target.value })
              }
              className="w-32 shadow-xs"
            />
          </div>
        </div>
      </Panel>

      {/* Auto messages */}
      <Panel
        title="Mensajes automáticos"
        description="Respuestas predefinidas para situaciones puntuales."
      >
        <div className="space-y-3">
          {config.mensajesAutomaticos.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-border bg-muted/30 p-3"
            >
              <div className="flex items-center gap-2">
                <Input
                  value={m.titulo}
                  placeholder="Título"
                  onChange={(e) => updateMsg(m.id, "titulo", e.target.value)}
                  className="h-8 bg-card font-medium shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => removeMsg(m.id)}
                  className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-status-late-soft hover:text-status-late"
                  aria-label="Eliminar"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <Textarea
                value={m.mensaje}
                rows={2}
                placeholder="Mensaje"
                onChange={(e) => updateMsg(m.id, "mensaje", e.target.value)}
                className="mt-2 bg-card shadow-xs"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMsg}
            className="gap-1.5"
          >
            <Plus className="size-4" />
            Agregar mensaje
          </Button>
        </div>
      </Panel>

      {/* Function-calling tools */}
      <Panel
        title="Funciones del agente"
        description="Capacidades que el modelo puede invocar (function calling). Extensible."
      >
        <ul className="space-y-2">
          {tools.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{t.nombre}</p>
                <p className="text-xs text-muted-foreground">{t.descripcion}</p>
                <code className="font-mono text-[0.65rem] text-brand-blue">
                  {t.id}
                </code>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={t.enabled}
                onClick={() =>
                  setTools((ts) =>
                    ts.map((x) =>
                      x.id === t.id ? { ...x, enabled: !x.enabled } : x,
                    ),
                  )
                }
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  t.enabled ? "bg-brand-navy" : "bg-muted-foreground/30",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform",
                    t.enabled ? "translate-x-[1.4rem]" : "translate-x-0.5",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Para agregar nuevas funciones, decláralas en{" "}
          <code className="font-mono text-brand-blue">features/chat/data.ts</code>.
        </p>
      </Panel>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="bg-brand-navy text-white shadow-md hover:bg-brand-navy/90"
        >
          Guardar configuración
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-status-ok">
            <Check className="size-4" />
            Guardado
          </span>
        )}
      </div>
    </form>
  );
}
