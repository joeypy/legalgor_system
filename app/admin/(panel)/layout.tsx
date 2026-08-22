import type { Metadata } from "next";

import { AppShell } from "@/components/dashboard/app-shell";
import { adminPaths } from "@/lib/app-paths";
import { requireAdminPage } from "@/features/identity/guard";
import { adminNav } from "@/lib/dashboard-nav";

export const metadata: Metadata = {
  title: {
    default: "LegalGor - Admin",
    template: "%s · LegalGor - Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminPage();

  return (
    <AppShell
      items={adminNav}
      homeHref={adminPaths.dashboard}
      brandLabel="Admin"
      fallbackTitle="Admin"
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
      signOutPath={adminPaths.entrar}
    >
      {children}
    </AppShell>
  );
}
