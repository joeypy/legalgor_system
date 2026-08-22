import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  /** Icon-only mark (for compact chrome). */
  markOnly?: boolean;
}

/**
 * Official LegalGor lockup: `legalgor-logo.svg` mark + wordmark.
 * `light` = for navy backgrounds. `dark` = for cream/white backgrounds.
 */
export function Logo({
  variant = "dark",
  className,
  markOnly = false,
}: LogoProps) {
  const isLight = variant === "light";

  const mark = (
    // Official square mark — native img so the SVG scales without Next Image rasterizing it.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/legalgor-logo.svg"
      alt={markOnly ? "LegalGor" : ""}
      width={48}
      height={48}
      className="h-12 w-12 shrink-0 rounded-lg"
    />
  );

  if (markOnly) {
    return <span className={cn("inline-flex", className)}>{mark}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {mark}
      <span
        className={cn(
          "text-2xl font-extrabold tracking-[0.14em]",
          isLight ? "text-white" : "text-brand-navy",
        )}
      >
        LEGALGOR
      </span>
    </span>
  );
}
