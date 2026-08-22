import type { Metadata } from "next";
import { CalendarClock, FileText, ShieldCheck } from "lucide-react";

import { requirePlatformPage } from "@/features/identity/guard";

export const metadata: Metadata = {
  title: "Inicio",
  robots: { index: false, follow: false },
};

export default async function PlataformaHomePage() {
  const session = await requirePlatformPage();
  const firstName =
    session.user.name?.trim().split(/\s+/)[0] ||
    session.user.email.split("@")[0];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-navy">
          Bienvenido, {firstName}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Este es su espacio de cliente en LegalGor. Pronto verá aquí sus
          obligaciones, trámites y documentos. Mientras tanto puede revisar su
          cuenta en Ajustes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-card p-5">
          <CalendarClock className="size-5 text-brand-wine" />
          <p className="mt-3 font-medium text-brand-navy">Obligaciones</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Próximamente: calendario fiscal y recordatorios.
          </p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-5">
          <FileText className="size-5 text-brand-wine" />
          <p className="mt-3 font-medium text-brand-navy">Trámites</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Próximamente: estado de sus gestiones con el despacho.
          </p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-5">
          <ShieldCheck className="size-5 text-brand-wine" />
          <p className="mt-3 font-medium text-brand-navy">Cuenta</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Active 2FA en Ajustes para mayor seguridad.
          </p>
        </div>
      </div>
    </div>
  );
}
