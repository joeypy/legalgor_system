import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/features/identity/schema";

function databaseUrl() {
  const url = process.env.DATABASE_URL ?? process.env.NEON_DB_URL;
  if (!url) {
    throw new Error("DATABASE_URL or NEON_DB_URL is required");
  }
  return url;
}

const sql = neon(databaseUrl());

export const db = drizzle(sql, { schema });
