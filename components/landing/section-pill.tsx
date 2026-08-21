import { cn } from "@/lib/utils";

/** Section eyebrow — vinotinto text accent. */
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
        "inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-wine",
        className,
      )}
    >
      {children}
    </span>
  );
}
