import type { Metadata } from "next";

import { AppShell } from "@/components/dashboard/app-shell";
import { adminPaths, platformPaths } from "@/lib/app-paths";
import { requirePlatformPage } from "@/features/identity/guard";
import { platformNav } from "@/lib/dashboard-nav";

export const metadata: Metadata = {
  title: {
    default: "LegalGor - Usuario",
    template: "%s · LegalGor - Usuario",
  },
  robots: { index: false, follow: false },
};

export default async function PlataformaPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requirePlatformPage();

  return (
    <AppShell
      items={platformNav}
      homeHref={platformPaths.home}
      brandLabel="Plataforma"
      fallbackTitle="Inicio"
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
      signOutPath={platformPaths.entrar}
      settingsHref={platformPaths.ajustes}
    >
      {children}
    </AppShell>
  );
}
