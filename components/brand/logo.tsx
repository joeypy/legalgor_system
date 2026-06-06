import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
}

/**
 * LegalGor monogram + wordmark, recreating the brand mark (a white rounded
 * "lG" badge with the LEGALGOR wordmark). `light` is for navy backgrounds.
 */
export function Logo({
  variant = "dark",
  className,
  showWordmark = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-xl font-bold leading-none",
          isLight
            ? "bg-white text-brand-navy"
            : "bg-brand-navy text-white",
        )}
        aria-hidden
      >
        <span className="text-lg tracking-tight">l</span>
        <span className="absolute bottom-1 right-1 text-[0.6rem] font-extrabold">
          G
        </span>
      </span>
      {showWordmark && (
        <span
          className={cn(
            "text-xl font-extrabold tracking-[0.12em]",
            isLight ? "text-white" : "text-brand-navy",
          )}
        >
          LEGALGOR
        </span>
      )}
    </span>
  );
}
