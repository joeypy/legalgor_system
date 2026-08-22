import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/features/identity/auth";

export const { GET, POST } = toNextJsHandler(auth);
