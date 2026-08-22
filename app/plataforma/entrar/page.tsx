import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/features/identity/ui/auth-shell";
import { SignInForm } from "@/features/identity/ui/sign-in-form";
import { adminPaths, platformPaths } from "@/lib/app-paths";
import { getActiveSession } from "@/features/identity/session";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function PlataformaSignInPage() {
  const session = await getActiveSession();
  if (session) {
    const role = (session.user as { role?: string }).role;
    if (role === "admin" || role === "staff") {
      redirect(adminPaths.dashboard);
    }
    if (role === "user") redirect(platformPaths.home);
  }

  return (
    <AuthShell
      title="Acceso plataforma"
      description="Portal de clientes LegalGor. Ingrese con su correo y contraseña."
    >
      <SignInForm nextPath={platformPaths.home} expectedRole="user" />
    </AuthShell>
  );
}
