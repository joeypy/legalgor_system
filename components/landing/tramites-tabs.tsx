"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { formatUsd, serviceLines } from "@/features/servicios/data";
import { cn } from "@/lib/utils";

const tramites = serviceLines.find((l) => l.slug === "tramites-individuales");

export function TramitesTabs() {
  const [active, setActive] = useState(0);
  if (!tramites) return null;

  const groups = tramites.groups;
  const current = groups[active];

  return (
    <div className="grid overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl md:grid-cols-[minmax(220px,0.8fr)_1.4fr]">
      {/* Left — list of titles */}
      <div className="flex gap-2 overflow-x-auto border-b border-border bg-brand-navy-deep p-3 md:flex-col md:gap-1 md:overflow-visible md:border-b-0 md:border-r">
        {groups.map((g, i) => {
          const activeTab = i === active;
          return (
            <button
              key={g.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "group flex shrink-0 items-center justify-between gap-2 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors md:w-full",
                activeTab
                  ? "bg-white text-brand-navy shadow-md"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <span>{g.title}</span>
              <ChevronRight
                className={cn(
                  "size-4 shrink-0 transition",
                  activeTab
                    ? "text-brand-blue"
                    : "text-white/40 group-hover:text-white/70",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Right — items + montos for the selected title */}
      <div className="flex flex-col justify-center p-6 sm:px-8 sm:py-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-2xl font-extrabold tracking-tight text-brand-navy">
                {current.title}
              </h3>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {current.items.length} trámites
              </span>
            </div>
            <ul className="mt-4 divide-y divide-border/50">
              {current.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 py-2"
                >
                  <span className="text-sm text-foreground/85">{item.label}</span>
                  {item.price != null && (
                    <span className="shrink-0 rounded-md bg-brand-tint px-2.5 py-0.5 font-mono text-sm font-bold tabular-nums text-brand-navy">
                      {formatUsd(item.price)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
