import type { Metadata } from "next";

import { requireAdminSetupSession } from "@/features/identity/guard";
import { AuthShell } from "@/features/identity/ui/auth-shell";
import { TwoFactorSetupPanel } from "@/features/identity/ui/two-factor-setup-panel";
import { adminPaths } from "@/lib/app-paths";

export const metadata: Metadata = {
  title: "Activar 2FA",
  robots: { index: false, follow: false },
};

export default async function Setup2faPage() {
  const session = await requireAdminSetupSession();

  return (
    <AuthShell
      title="Activar autenticador"
      description="Escanee el código QR con su app de autenticación (Google Authenticator, 1Password, Authy…)."
    >
      <TwoFactorSetupPanel
        alreadyEnabled={Boolean(session.user.twoFactorEnabled)}
        nextPath={adminPaths.dashboard}
      />
    </AuthShell>
  );
}
