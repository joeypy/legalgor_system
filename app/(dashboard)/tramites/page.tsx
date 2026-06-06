import { SectionHeader } from "@/components/dashboard/section-header";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { TramitePipeline } from "@/components/dashboard/tramite-pipeline";
import { etapas, tramitesActivos } from "@/features/tramites/data";

export default function TramitesPage() {
  const activos = tramitesActivos().length;

  return (
    <>
      <DashboardTopbar title="Trámites" />
      <div className="flex-1 space-y-5 p-4 sm:p-6">
        <SectionHeader
          title="Constitución de compañías"
          meta={`${activos} trámites activos · ${etapas.length} etapas`}
        />
        <TramitePipeline />
      </div>
    </>
  );
}
