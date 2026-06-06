import { cn } from "@/lib/utils";

/**
 * The "Ref." code rendered as an official stamp/sello — the LegalGor brand
 * signature reused across service tiers and registration packages.
 */
export function RefStamp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-brand-navy/25 px-2 py-0.5 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-brand-navy",
        className,
      )}
    >
      {children}
    </span>
  );
}
