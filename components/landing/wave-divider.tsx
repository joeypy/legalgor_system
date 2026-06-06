import { cn } from "@/lib/utils";

/**
 * The signature white wavy divider from the brand flyers. Render it at the
 * bottom of a navy section to transition into a white one (or flip it).
 */
export function WaveDivider({
  className,
  fill = "var(--background)",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={cn("pointer-events-none w-full leading-[0]", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("h-[60px] w-full md:h-[90px]", flip && "rotate-180")}
      >
        <path
          d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,64 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
