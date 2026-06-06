import { cn } from "@/lib/utils";

/** Rounded navy pill heading used throughout the LegalGor brand material. */
export function SectionPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-navy px-6 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
