import { Sparkles } from "lucide-react";

import { RefStamp } from "@/components/dashboard/ref-stamp";
import type { ChatMessage } from "@/features/chat/types";
import { cn } from "@/lib/utils";

function MediaInner({ message }: { message: ChatMessage }) {
  switch (message.kind) {
    case "image":
      return (
        <a href={message.url} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={message.url}
            alt={message.fileName ?? "imagen"}
            className="max-h-64 w-auto rounded-lg object-cover"
          />
        </a>
      );
    case "video":
      return (
        <video
          src={message.url}
          controls
          className="max-h-64 w-full rounded-lg"
        />
      );
    case "audio":
      return <audio src={message.url} controls className="w-60 max-w-full" />;
    default:
      return null;
  }
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const inbound = message.author === "contacto";
  const isMedia =
    message.kind === "image" ||
    message.kind === "video" ||
    message.kind === "audio";

  return (
    <div className={cn("flex", inbound ? "justify-start" : "justify-end")}>
      <div className="flex max-w-[80%] flex-col gap-1">
        {message.author === "ia" && (
          <span className="inline-flex items-center gap-1 self-end text-[0.65rem] font-medium uppercase tracking-wide text-brand-blue">
            <Sparkles className="size-3" />
            Asistente IA
          </span>
        )}

        {message.kind === "cards" ? (
          <div className="rounded-2xl rounded-br-sm border border-border bg-card p-3 shadow-sm">
            {message.text && (
              <p className="mb-2 text-sm text-foreground">{message.text}</p>
            )}
            <ul className="space-y-1.5">
              {message.cards?.map((c) => (
                <li
                  key={c.title}
                  className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-brand-navy">
                      {c.title}
                    </p>
                    {c.subtitle && (
                      <p className="truncate text-xs text-muted-foreground">
                        {c.subtitle}
                      </p>
                    )}
                  </div>
                  {c.badge && <RefStamp>{c.badge}</RefStamp>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className={cn(
              "shadow-sm",
              isMedia ? "p-1" : "px-3.5 py-2.5",
              inbound
                ? "rounded-2xl rounded-bl-sm bg-muted text-foreground"
                : "rounded-2xl rounded-br-sm bg-brand-navy text-white",
            )}
          >
            {isMedia ? (
              <MediaInner message={message} />
            ) : (
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.text}
              </p>
            )}
          </div>
        )}

        <time
          className={cn(
            "font-mono text-[0.65rem] text-muted-foreground tabular-nums",
            inbound ? "self-start" : "self-end",
          )}
        >
          {message.time}
        </time>
      </div>
    </div>
  );
}
