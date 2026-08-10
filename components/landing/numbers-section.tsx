"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { Reveal } from "./motion-primitives";

const metrics = [
  { target: 4, prefix: "", suffix: "", label: "Líneas de servicio" },
  { target: 20, prefix: "+", suffix: "", label: "Trámites y declaraciones" },
  { target: 2, prefix: "", suffix: "", label: "Regímenes fiscales" },
  { target: 100, prefix: "", suffix: "%", label: "Atención personalizada" },
];

function AnimatedValue({
  target,
  prefix,
  suffix,
  active,
}: {
  target: number;
  prefix: string;
  suffix: string;
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const durationMs = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <span className="font-mono text-5xl font-bold tabular-nums tracking-tight sm:text-6xl">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function NumbersSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="numeros"
      className="bg-brand-navy-deep py-24 text-white sm:py-28"
      aria-labelledby="numbers-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-sky">
            Nuestros números
          </p>
          <h2
            id="numbers-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Experiencia al servicio de tu empresa
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <AnimatedValue
                target={metric.target}
                prefix={metric.prefix}
                suffix={metric.suffix}
                active={isInView}
              />
              <p className="mt-3 text-sm font-medium text-white/55">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
