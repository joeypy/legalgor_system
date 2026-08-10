import { cn } from "@/lib/utils";

/** Compact section eyebrow used across the landing. */
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
        "inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue",
        className,
      )}
    >
      {children}
    </span>
  );
}
