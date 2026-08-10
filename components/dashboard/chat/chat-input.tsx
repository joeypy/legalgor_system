"use client";

import { useRef, useState } from "react";
import {
  ImageIcon,
  Mic,
  Paperclip,
  Send,
  Sparkles,
  Square,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { planesServiciosCards } from "@/features/chat/data";
import type { ChatMessage, MessageKind } from "@/features/chat/types";
import { cn } from "@/lib/utils";

export type Outgoing = Pick<
  ChatMessage,
  "kind" | "text" | "url" | "fileName" | "cards"
>;

export function ChatInput({ onSend }: { onSend: (m: Outgoing) => void }) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);
  const audRef = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const sendText = () => {
    const t = text.trim();
    if (!t) return;
    onSend({ kind: "text", text: t });
    setText("");
  };

  const onFile = (
    kind: MessageKind,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onSend({ kind, url: URL.createObjectURL(file), fileName: file.name });
    }
    e.target.value = "";
  };

  const toggleRecord = async () => {
    if (recording) {
      recorderRef.current?.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (ev) => chunksRef.current.push(ev.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        onSend({
          kind: "audio",
          url: URL.createObjectURL(blob),
          fileName: "nota-de-voz.webm",
        });
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
      };
      rec.start();
      recorderRef.current = rec;
      setRecording(true);
    } catch {
      // mic permission denied or unsupported — silently ignore
    }
  };

  const tools = [
    { ref: imgRef, accept: "image/*", kind: "image" as const, icon: ImageIcon, label: "Imagen" },
    { ref: vidRef, accept: "video/*", kind: "video" as const, icon: Video, label: "Video" },
    { ref: audRef, accept: "audio/*", kind: "audio" as const, icon: Paperclip, label: "Audio" },
  ];

  return (
    <div className="border-t border-border bg-background p-3 sm:p-4">
      {/* Quick actions — function-calling hooks (extensible) */}
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onSend({
              kind: "cards",
              text: "Estos son nuestros servicios y paquetes:",
              cards: planesServiciosCards(),
            })
          }
          className="h-8 gap-1.5 border-brand-blue/30 text-brand-blue hover:bg-brand-tint"
        >
          <Sparkles className="size-3.5" />
          Planes y servicios
        </Button>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex items-center">
          {tools.map((t) => (
            <button
              key={t.kind}
              type="button"
              title={t.label}
              onClick={() => t.ref.current?.click()}
              className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <t.icon className="size-5" />
            </button>
          ))}
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendText();
            }
          }}
          rows={1}
          placeholder="Escribe un mensaje..."
          className="max-h-32 min-h-9 flex-1 resize-none py-2"
        />

        <button
          type="button"
          title={recording ? "Detener" : "Grabar audio"}
          onClick={toggleRecord}
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-lg transition-colors",
            recording
              ? "bg-status-late text-white"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {recording ? (
            <Square className="size-4 fill-current" />
          ) : (
            <Mic className="size-5" />
          )}
        </button>

        <Button
          type="button"
          size="icon"
          onClick={sendText}
          disabled={!text.trim()}
          className="size-9 shrink-0 bg-brand-navy text-white hover:bg-brand-navy/90"
        >
          <Send className="size-4" />
        </Button>
      </div>

      <input ref={imgRef} type="file" accept="image/*" hidden onChange={(e) => onFile("image", e)} />
      <input ref={vidRef} type="file" accept="video/*" hidden onChange={(e) => onFile("video", e)} />
      <input ref={audRef} type="file" accept="audio/*" hidden onChange={(e) => onFile("audio", e)} />
    </div>
  );
}
