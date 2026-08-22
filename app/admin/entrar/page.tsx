import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/features/identity/ui/auth-shell";
import { SignInForm } from "@/features/identity/ui/sign-in-form";
import { adminPaths } from "@/lib/app-paths";
import { getActiveSession } from "@/features/identity/session";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function AdminSignInPage() {
  const session = await getActiveSession();
  if (session) {
    const role = (session.user as { role?: string }).role;
    if (role === "admin" || role === "staff") {
      redirect(
        session.user.twoFactorEnabled
          ? adminPaths.dashboard
          : adminPaths.setup2fa,
      );
    }
  }

  return (
    <AuthShell
      title="Acceso administración"
      description="Ingrese con su correo y contraseña. Si tiene 2FA activo, le pediremos el código."
    >
      <SignInForm nextPath={adminPaths.dashboard} expectedRole="admin" />
    </AuthShell>
  );
}
