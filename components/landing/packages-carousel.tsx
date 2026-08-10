"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, GripHorizontal } from "lucide-react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

import {
  registrationPackages,
} from "@/features/servicios/data";
import { cn } from "@/lib/utils";

const SPEED = 32; // px per second
const wrapValue = (v: number, min: number, max: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function PackageCard({ pkg }: { pkg: (typeof registrationPackages)[number] }) {
  return (
    <article
      className={cn(
        "flex w-[280px] shrink-0 select-none flex-col rounded-3xl border border-border bg-white p-7 text-brand-navy shadow-sm",
        pkg.highlighted && "border-brand-blue/40 bg-brand-tint/50 shadow-md",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
            {pkg.segment}
          </p>
          <h3 className="mt-1 text-xl font-extrabold">{pkg.name}</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-brand-navy px-3 py-1.5 font-mono text-xs font-bold text-white">
          {pkg.ref}
        </span>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {pkg.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" />
            <span className="text-foreground/80">{f}</span>
          </li>
        ))}
        {pkg.features.length > 4 && (
          <li className="pl-6 text-sm font-medium text-brand-blue">
            + {pkg.features.length - 4} incluidos
          </li>
        )}
      </ul>

      <Link
        href={`/paquetes/${pkg.slug}`}
        draggable={false}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy/90"
      >
        Ver detalle
        <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}

export function PackagesCarousel() {
  const x = useMotionValue(0);
  const groupRef = useRef<HTMLDivElement>(null);
  const [half, setHalf] = useState(0);
  const paused = useRef(false);
  const dragging = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (groupRef.current) setHalf(groupRef.current.scrollWidth + 24); // + gap
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused.current || dragging.current || half === 0) return;
    x.set(wrapValue(x.get() - (SPEED * delta) / 1000, -half, 0));
  });

  return (
    <div
      className="relative overflow-hidden"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <motion.div
        className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -half, right: 0 }}
        dragElastic={0.08}
        onDragStart={() => (dragging.current = true)}
        onDragEnd={() => {
          dragging.current = false;
          x.set(wrapValue(x.get(), -half, 0));
        }}
      >
        <div ref={groupRef} className="flex gap-6">
          {registrationPackages.map((pkg) => (
            <PackageCard key={pkg.ref} pkg={pkg} />
          ))}
        </div>
        <div className="flex gap-6" aria-hidden>
          {registrationPackages.map((pkg) => (
            <PackageCard key={`dup-${pkg.ref}`} pkg={pkg} />
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent sm:w-20" />

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <GripHorizontal className="size-4" />
        Arrastra para explorar
      </p>
    </div>
  );
}
