import { RefStamp } from "@/components/dashboard/ref-stamp";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clientes } from "@/features/clientes/data";
import type { Regimen } from "@/features/clientes/types";
import { obligacionesEnriquecidas, venceLabel } from "@/features/vencimientos/data";

const proximoPorCliente = () => {
  const map = new Map<string, ReturnType<typeof obligacionesEnriquecidas>[number]>();
  for (const o of obligacionesEnriquecidas()) {
    if (!map.has(o.clienteId)) map.set(o.clienteId, o); // already sorted by urgency
  }
  return map;
};

const grupos: { regimen: Regimen; titulo: string; sub: string }[] = [
  { regimen: "especial", titulo: "Contribuyentes especiales", sub: "IVA quincenal · retenciones" },
  { regimen: "ordinario", titulo: "Contribuyentes ordinarios", sub: "IVA mensual" },
];

export default function ClientesPage() {
  const proximos = proximoPorCliente();

  return (
    <>
      <DashboardTopbar title="Clientes" />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        {grupos.map((g) => {
          const filas = clientes.filter((c) => c.regimen === g.regimen);
          return (
            <section
              key={g.regimen}
              className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-4 sm:px-6">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    {g.titulo}
                  </h2>
                  <p className="text-xs text-muted-foreground">{g.sub}</p>
                </div>
                <span className="font-mono text-sm tabular-nums text-muted-foreground">
                  {filas.length}
                </span>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Razón social</TableHead>
                    <TableHead className="hidden md:table-cell">RIF</TableHead>
                    <TableHead className="hidden lg:table-cell">Plan</TableHead>
                    <TableHead className="text-right">Próximo vencimiento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filas.map((c) => {
                    const next = proximos.get(c.id);
                    return (
                      <TableRow key={c.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{c.nombre}</p>
                          <p className="text-xs text-muted-foreground">
                            {c.actividad}
                          </p>
                        </TableCell>
                        <TableCell className="hidden font-mono text-sm text-muted-foreground md:table-cell">
                          {c.rif}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <RefStamp>{c.plan}</RefStamp>
                        </TableCell>
                        <TableCell className="text-right">
                          {next ? (
                            <div className="flex items-center justify-end gap-3">
                              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                                {venceLabel(next.vence)}
                              </span>
                              <StatusBadge status={next.status} />
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </section>
          );
        })}
      </div>
    </>
  );
}
