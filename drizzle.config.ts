import { defineConfig, type Config } from "drizzle-kit";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".dev.vars" });

const url = process.env.DATABASE_URL ?? process.env.NEON_DB_URL;
if (!url) {
  throw new Error("DATABASE_URL or NEON_DB_URL is required for drizzle-kit");
}

export default defineConfig({
  schema: "./features/identity/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
}) satisfies Config;
