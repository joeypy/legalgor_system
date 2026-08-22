import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@/features/identity/auth";

export type ActiveSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export const getActiveSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});
