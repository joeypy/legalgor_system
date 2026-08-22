import { redirect } from "next/navigation";

import { adminPaths, platformPaths } from "@/lib/app-paths";
import { getActiveSession } from "@/features/identity/session";

function roleOf(session: NonNullable<Awaited<ReturnType<typeof getActiveSession>>>) {
  return (session.user as { role?: string }).role ?? "user";
}

function isStaffRole(role: string) {
  return role === "admin" || role === "staff";
}

export async function requireAdminPage() {
  const session = await getActiveSession();
  if (!session) redirect(adminPaths.entrar);

  const role = roleOf(session);
  if (!isStaffRole(role)) redirect(adminPaths.entrar);

  if (!session.user.twoFactorEnabled) {
    redirect(adminPaths.setup2fa);
  }

  return session;
}

export async function requirePlatformPage() {
  const session = await getActiveSession();
  if (!session) redirect(platformPaths.entrar);

  const role = roleOf(session);
  if (role !== "user") {
    if (isStaffRole(role)) redirect(adminPaths.dashboard);
    redirect(platformPaths.entrar);
  }

  return session;
}

/** Allows password login but forces 2FA enrollment before the panel. */
export async function requireAdminSetupSession() {
  const session = await getActiveSession();
  if (!session) redirect(adminPaths.entrar);

  const role = roleOf(session);
  if (!isStaffRole(role)) redirect(adminPaths.entrar);

  if (session.user.twoFactorEnabled) {
    redirect(adminPaths.dashboard);
  }

  return session;
}
