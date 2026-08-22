# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

LegalGor is a Venezuelan accounting, tax, and legal services firm. This repo is its
web system: public **landing**, authenticated **admin** panel, and **cliente** platform.
Built with **Next.js 16** (App Router) and deployed to **Cloudflare Workers** via
**OpenNext** (`@opennextjs/cloudflare`). Auth uses **Better Auth** + TOTP/QR on
**Neon Postgres** (dev DB `legalgor_dev`; production DB `legalgor` later).

## Commands

```bash
bun install
bun run dev          # Next.js dev server (http://localhost:3000)
bun run build        # next build
bun run preview      # OpenNext build + local workerd preview
bun run deploy       # OpenNext build + deploy to Cloudflare Workers
bun run typecheck    # tsc --noEmit
bun run lint         # eslint (flat config, eslint-config-next)
bun run cf-typegen   # wrangler types → cloudflare-env.d.ts
bun run db:push      # drizzle-kit push → Neon
bun run db:seed      # seed admin@ + usuario@ legalgor.com
bun run db:studio    # drizzle-kit studio
```

- **Package manager: Bun only** (no pnpm, npm, or yarn).
- There is no test runner configured yet.
- shadcn components: `bunx shadcn@latest add <component>` (config in `components.json`,
  library = **radix**, preset = nova, Tailwind v4).

## Stack

- **Next.js 16.3** + **React 19** + **TypeScript 7**, RSC enabled.
- **OpenNext** `@opennextjs/cloudflare` + **Wrangler** → Cloudflare Workers.
- **Neon Postgres** via `@neondatabase/serverless` + **Drizzle ORM**.
- **Better Auth** (`features/identity/`) with `twoFactor` plugin (TOTP + QR + backup codes).
- **Tailwind v4** (CSS-first) via **`@tailwindcss/postcss`**.
- **shadcn/ui** + **lucide-react**. Import alias **`@/*` → repo root**.

### Hosts

| Host | Role |
| --- | --- |
| `grupolegalgor.com` | Marketing landing |
| `admin.grupolegalgor.com` | Internal admin (2FA mandatory) |
| `plataforma.grupolegalgor.com` | Client portal |

`www` → apex (308). Middleware rewrites bare paths on `admin.*` / `plataforma.*`
to internal `app/admin/*` and `app/plataforma/*`. Public URLs are `/dashboard`,
`/entrar`, etc. — no `/admin` or `/plataforma` prefix on those hosts.

## Architecture

Pragmatic, **feature-first**.

- `app/` — Next.js App Router.
  - `app/page.tsx` — landing (`components/landing/*`).
  - `app/paquetes/[slug]/page.tsx` — package detail (`generateStaticParams`; await `params`).
  - `app/admin/` — internal routes; on `admin.*` served as `/entrar`, `/dashboard`, …
  - `app/plataforma/` — internal routes; on `plataforma.*` served as `/`, `/ajustes`, …
  - `app/api/auth/[...all]/route.ts` — Better Auth handler.
  - `app/globals.css` — navy / wine / cream + fiscal status tokens.
- `features/identity/` — Better Auth server/client, Drizzle schema, guards, auth UI
  (sign-in, second factor, QR setup with `qrcode.react`).
- `features/` — domain seeds: `servicios`, `clientes`, `vencimientos`, `tramites`, `chat`, `ai`.
  Landing and panels read from here — never hardcode catalog/data.
- `components/landing|dashboard|brand|ui/` — UI. Dashboard design system:
  **`.interface-design/system.md`**.
- `lib/db.ts` — Neon + Drizzle. `lib/hosts.ts` — host resolution. `lib/site.ts` — brand/contact.
- `middleware.ts` — host routing, www redirect, optional `ADMIN_IP_ALLOWLIST` via
  **`cf-connecting-ip` only** (no `x-forwarded-for`).
- `scripts/seed-auth.ts` — creates/updates test users.
- `wrangler.jsonc` / `open-next.config.ts` — Worker + custom domains.

### Auth seeds (dev)

- Admin: `admin@legalgor.com` / `legalgor123` — role `admin`, must enroll TOTP before panel.
- Platform: `usuario@legalgor.com` / `legalgor123` — role `user`.

Secrets: `.env` / `.dev.vars` locally; `wrangler secret` in production
(`DATABASE_URL`, `BETTER_AUTH_SECRET`, optional `ADMIN_IP_ALLOWLIST`). Never commit them.

### Brand & content conventions

- Colors: **navy + vinotinto + cream** — use `bg-brand-navy`, `text-brand-wine`,
  `bg-brand-cream`, etc. `brand-blue*` aliases wine.
- **UI copy Spanish.** Code identifiers English.
- Brand assets in `public/brand/` (served) and `assets/` (reference).
- Icons by string name in data → `iconMap` in consuming components.

## Deploy

`bun run deploy` → OpenNext build + Wrangler. Requires Cloudflare auth.

Custom domains in `wrangler.jsonc`: apex, www, admin, plataforma.

When moving to real clients: create Neon DB `legalgor`, update `DATABASE_URL` only.

## Status / next steps

- Auth + Neon `legalgor_dev` + multi-host shell are in place; panel data still demo seeds.
- Configure Cloudflare WAF IP allowlist for admin (code allowlist is secondary).
- Persistence for `/configuracion` and CRUD (clientes, trámites, obligations) still pending.
- Landing contact form still opens WhatsApp (`whatsappUrl`) — no server capture yet.
