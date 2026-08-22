import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";

import { db } from "@/lib/db";
import * as schema from "@/features/identity/schema";

function authSecret() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must be set (min 32 characters)");
  }
  return secret;
}

function trustedOrigins() {
  const fromEnv = process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromEnv?.length) return fromEnv;
  return [
    "https://admin.grupolegalgor.com",
    "https://plataforma.grupolegalgor.com",
    "http://localhost:3000",
    "http://admin.localhost:3000",
    "http://plataforma.localhost:3000",
  ];
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
      twoFactor: schema.twoFactor,
      rateLimit: schema.rateLimit,
    },
  }),
  secret: authSecret(),
  // Per-request host (admin vs plataforma) — sessions stay host-scoped.
  baseURL: {
    allowedHosts: [
      "admin.grupolegalgor.com",
      "plataforma.grupolegalgor.com",
      "localhost:3000",
      "admin.localhost:3000",
      "plataforma.localhost:3000",
    ],
    fallback:
      process.env.BETTER_AUTH_URL ??
      (process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://admin.grupolegalgor.com"),
  },
  trustedOrigins: trustedOrigins(),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"],
    },
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 60, max: 15 },
      "/two-factor/verify-totp": { window: 60, max: 10 },
      "/two-factor/verify-backup-code": { window: 60, max: 10 },
      "/two-factor/enable": { window: 60, max: 5 },
      "/two-factor/disable": { window: 60, max: 5 },
    },
  },
  plugins: [
    twoFactor({
      issuer: "LegalGor",
      totpOptions: { period: 30, digits: 6 },
      skipVerificationOnEnable: false,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
