import type { Metadata } from "next";

import { TwoFactorDisablePanel } from "@/features/identity/ui/two-factor-disable-panel";
import { TwoFactorSetupPanel } from "@/features/identity/ui/two-factor-setup-panel";
import { adminPaths, platformPaths } from "@/lib/app-paths";
import { requirePlatformPage } from "@/features/identity/guard";

export const metadata: Metadata = {
  title: "Ajustes",
  robots: { index: false, follow: false },
};

export default async function PlataformaAjustesPage() {
  const session = await requirePlatformPage();
  const twoFactorEnabled = Boolean(session.user.twoFactorEnabled);

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4 sm:p-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-navy">Cuenta</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {session.user.email}
        </p>
      </div>

      <section className="space-y-3">
        <div>
          <h3 className="font-medium text-brand-navy">
            Verificación en dos pasos
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Opcional para clientes. Si la activa, necesitará su autenticador
            cada vez que inicie sesión.
          </p>
        </div>
        {twoFactorEnabled ? (
          <TwoFactorDisablePanel />
        ) : (
          <TwoFactorSetupPanel
            alreadyEnabled={false}
            nextPath={platformPaths.ajustes}
            doneLabel="Listo"
          />
        )}
      </section>
    </div>
  );
}
