import { statusMeta } from "@/features/vencimientos/data";
import type { FiscalStatus } from "@/features/vencimientos/types";
import { cn } from "@/lib/utils";

/** Fiscal status pill — colour here always carries meaning, never decoration. */
export function StatusBadge({
  status,
  className,
}: {
  status: FiscalStatus;
  className?: string;
}) {
  const m = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        m.bg,
        m.fg,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", m.dot)} />
      {m.label}
    </span>
  );
}
