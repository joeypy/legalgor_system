"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, Sparkles } from "lucide-react";

import {
  ChannelDot,
  ChannelLabel,
} from "@/components/dashboard/chat/channel-badge";
import {
  ChatInput,
  type Outgoing,
} from "@/components/dashboard/chat/chat-input";
import { MessageBubble } from "@/components/dashboard/chat/message-bubble";
import { conversations as seed } from "@/features/chat/data";
import type { Conversation } from "@/features/chat/types";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const nowHHMM = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes(),
  ).padStart(2, "0")}`;
};

export default function ChatsPage() {
  const [convos, setConvos] = useState<Conversation[]>(seed);
  const [activeId, setActiveId] = useState(seed[0]?.id ?? "");
  const [mobileThread, setMobileThread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => convos.find((c) => c.id === activeId),
    [convos, activeId],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [active?.messages.length, activeId]);

  const openConversation = (id: string) => {
    setActiveId(id);
    setMobileThread(true);
    setConvos((cs) =>
      cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const send = (out: Outgoing) => {
    setConvos((cs) =>
      cs.map((c) =>
        c.id === activeId
          ? {
              ...c,
              preview:
                out.kind === "text"
                  ? out.text ?? ""
                  : out.kind === "cards"
                    ? "Planes y servicios"
                    : `${out.kind === "image" ? "Imagen" : out.kind === "video" ? "Video" : "Audio"} enviado`,
              time: nowHHMM(),
              messages: [
                ...c.messages,
                { id: `s-${Date.now()}`, author: "agente", time: nowHHMM(), ...out },
              ],
            }
          : c,
      ),
    );
  };

  const toggleAI = () => {
    setConvos((cs) =>
      cs.map((c) => (c.id === activeId ? { ...c, aiActive: !c.aiActive } : c)),
    );
  };

  return (
    <>
      <div className="flex h-[calc(100dvh-4rem)] overflow-hidden">
        {/* Conversation list */}
        <aside
          className={cn(
            "w-full shrink-0 flex-col border-r border-border bg-background md:flex md:w-80 lg:w-96",
            mobileThread ? "hidden md:flex" : "flex",
          )}
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">
              Conversaciones
            </p>
            <p className="font-mono text-xs text-muted-foreground tabular-nums">
              {convos.length} chats · {convos.filter((c) => c.unread > 0).length}{" "}
              sin leer
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {convos.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openConversation(c.id)}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors",
                    isActive ? "bg-brand-tint" : "hover:bg-muted/60",
                  )}
                >
                  <div className="relative shrink-0">
                    <span className="grid size-11 place-items-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                      {initials(c.nombre)}
                    </span>
                    <span className="absolute -bottom-1 -right-1">
                      <ChannelDot channel={c.channel} />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {c.nombre}
                      </p>
                      <span className="shrink-0 font-mono text-[0.65rem] text-muted-foreground tabular-nums">
                        {c.time}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-muted-foreground">
                        {c.aiActive && (
                          <Sparkles className="mr-1 inline size-3 text-brand-blue" />
                        )}
                        {c.preview}
                      </p>
                      {c.unread > 0 && (
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-blue text-[0.65rem] font-bold text-white">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Thread */}
        <section
          className={cn(
            "min-w-0 flex-1 flex-col bg-muted/30",
            mobileThread ? "flex" : "hidden md:flex",
          )}
        >
          {active ? (
            <>
              <header className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
                <button
                  type="button"
                  onClick={() => setMobileThread(false)}
                  className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
                  aria-label="Volver"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                  {initials(active.nombre)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {active.nombre}
                  </p>
                  <ChannelLabel channel={active.channel} />
                </div>
                <button
                  type="button"
                  onClick={toggleAI}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active.aiActive
                      ? "bg-brand-tint text-brand-navy"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {active.aiActive ? (
                    <Pause className="size-3.5" />
                  ) : (
                    <Play className="size-3.5" />
                  )}
                  IA {active.aiActive ? "activa" : "en pausa"}
                </button>
              </header>

              <div
                ref={scrollRef}
                className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
              >
                {active.messages.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}
              </div>

              <ChatInput onSend={send} />
            </>
          ) : (
            <div className="grid flex-1 place-items-center text-sm text-muted-foreground">
              Selecciona una conversación
            </div>
          )}
        </section>
      </div>
    </>
  );
}
