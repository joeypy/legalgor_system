import { redirect } from "next/navigation";

import { adminPaths } from "@/lib/app-paths";
import { getActiveSession } from "@/features/identity/session";

export default async function AdminIndexPage() {
  const session = await getActiveSession();
  if (!session) redirect(adminPaths.entrar);
  if (!session.user.twoFactorEnabled) redirect(adminPaths.setup2fa);
  redirect(adminPaths.dashboard);
}
