"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const SLIDE_MS = 8500;

const slides = [
  "Tu empresa en manos expertas",
  "De la constitución al cumplimiento",
  "Contable, tributario y legal en un solo lugar",
];

const stats = [
  { value: "4", label: "Líneas de servicio" },
  { value: "+20", label: "Trámites y declaraciones" },
  { value: "100%", label: "Atención personalizada" },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-4.25rem)] flex-col justify-center overflow-hidden bg-brand-navy-deep text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,oklch(0.35_0.07_260/0.5)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-1/4 size-[28rem] rotate-12 rounded-[2rem] border border-white/10 bg-white/[0.03]"
      />
      <div
        aria-hidden
        className="absolute -left-16 bottom-10 size-[20rem] -rotate-6 rounded-[2rem] border border-white/10 bg-brand-wine/15"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24">
        <Logo variant="light" className="scale-125" />
        <p className="mt-5 text-sm font-medium text-white/60">
          {siteConfig.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          {siteConfig.description}
        </p>

        <div className="relative mt-10 min-h-[5.5rem] w-full sm:min-h-[7rem]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slides[index]}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
            >
              {slides[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-8 text-brand-navy hover:bg-white/90"
          >
            <a href="#contacto">
              Contáctenos
              <ArrowRight className="size-4" />
            </a>
          </Button>

          <div className="flex items-center gap-2">
            {slides.map((title, i) => (
              <button
                key={title}
                type="button"
                aria-label={`Diapositiva ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={
                  i === index
                    ? "h-2 w-8 rounded-full bg-white transition-all"
                    : "size-2 rounded-full bg-white/35 transition-all hover:bg-white/60"
                }
              />
            ))}
          </div>
        </div>

        <dl className="mt-14 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs font-medium text-white/55 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
