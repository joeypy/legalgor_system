# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

LegalGor is a Venezuelan accounting, tax, and legal services firm. This repo is its
web system: a public **landing** (marketing + service catalog) and an authenticated-style
**dashboard** (internal management shell). Built with **Next.js 16** (App Router) and
deployed to **Cloudflare Workers** via **OpenNext** (`@opennextjs/cloudflare`).

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
```

- **Package manager: Bun only** (no pnpm, npm, or yarn).
- There is no test runner configured yet.
- shadcn components: `bunx shadcn@latest add <component>` (config in `components.json`,
  library = **radix**, preset = nova, Tailwind v4).

## Stack

- **Next.js 16.3** + **React 19** + **TypeScript 7**, RSC enabled (`rsc: true`).
- **OpenNext** `@opennextjs/cloudflare` + **Wrangler** → Cloudflare Workers.
- **Tailwind v4** (CSS-first, no `tailwind.config`) via **`@tailwindcss/postcss`**.
- **shadcn/ui** primitives in `components/ui/`, icons from **lucide-react**.
- Import alias **`@/*` → repo root** (e.g. `@/components`, `@/features`, `@/lib`).
- Production domain: **`https://grupolegalgor.com`** (Worker name `legalgor`;
  `www` redirects to apex via `middleware.ts`).

## Architecture

Pragmatic, **feature-first** (intended to evolve toward hexagonal as domains harden — not
ports-&-adapters yet).

- `app/` — Next.js App Router.
  - `app/page.tsx` — the **landing**, composed from `components/landing/*` sections.
  - `app/paquetes/[slug]/page.tsx` — per-package detail page (slug = plan name, e.g.
    `/paquetes/full`, `/paquetes/basico`); uses `generateStaticParams`. `params` is a **Promise** (Next 16 — await it).
  - `app/(dashboard)/` — route group for the internal panel. `layout.tsx` renders the sidebar
    shell; pages: `/dashboard` (Hoy), `/chats`, `/vencimientos`, `/clientes`, `/tramites`,
    `/servicios` (Catálogo), `/configuracion` (Tabs: Landing + IA).
    - `/chats` — multi-channel inbox (WhatsApp/IG/Messenger/Telegram/TikTok). Client page owns
      conversation state; supports text/image/video/audio messages (attachments via
      `URL.createObjectURL`, voice via `MediaRecorder`) + a "Planes y servicios" quick action
      that emits a `cards` message. **No backend/ManyChat connection yet — demo state only.**
  - `app/globals.css` — Tailwind entry + the **navy / wine / cream brand theme** and **fiscal status
    tokens** as CSS variables (`--brand-*`, `--status-ok|warn|late`) mapped via `@theme inline`.
- `features/` — feature-first domains, each `types.ts` + `data.ts`, single source of truth:
  - `servicios/` — service lines + registration packages (+ `packagePrice`/`formatUsd`).
  - `clientes/` — sample clients with `regimen` (ordinario/especial).
  - `vencimientos/` — fiscal obligations + `fiscalStatus`/`venceLabel` anchored to a fixed
    `TODAY` constant (deterministic demo). `statusMeta` maps status → colour utilities.
  - `tramites/` — registration pipeline `etapas` + sample trámites.
  - `chat/` — `channelMeta` (per-channel brand colour), sample `conversations`, and
    `chatTools` (the function-calling registry the AI agent can invoke — add tools here).
    `planesServiciosCards()` builds the catalog payload for the `enviar_planes_servicios` tool.
  - `ai/config.ts` — AI agent config defaults (context PDF, system prompt, schedule,
    auto-messages) edited from `/configuracion` → IA tab.
  - **Both the landing and the dashboard read from `features/` — never hardcode catalog/data.**
- `components/landing/` — landing sections (hero, services, packages-carousel, tramites-tabs,
  about, contact, footer) + brand pieces (`section-pill`, `wave-divider`).
- `components/dashboard/` — sidebar, topbar (mobile sheet nav), `status-ribbon`, `status-badge`,
  `ref-stamp` (the "Ref." sello), `vencimiento-row`, `tramite-pipeline`, `section-header`.
  Design system documented in **`.interface-design/system.md`** — read it before touching the
  dashboard (mono tabular figures, fiscal-status colour-as-meaning, borders-led depth).
- `components/brand/` — `logo.tsx` (LEGALGOR monogram, `variant="light"` for navy) and
  `icons.tsx` (inline Instagram/WhatsApp SVGs — **lucide-react dropped brand icons**).
- `components/ui/` — shadcn primitives. `lib/utils.ts` exports `cn()`.
- `lib/site.ts` — site/brand config + `ContactInfo` (whatsapp/instagram/address/maps),
  `whatsappUrl()` and `instagramHandle()` helpers. Editable from `/configuracion`
  (persistence pending a Cloudflare KV/D1 binding).
- `lib/dashboard-nav.ts` — dashboard sidebar nav (label/href/icon name).
- `middleware.ts` — redirects `www.grupolegalgor.com` → apex (308). Keep as `middleware.ts`
  (OpenNext does not support `proxy.ts` yet).
- `wrangler.jsonc` / `open-next.config.ts` — Cloudflare Worker + OpenNext adapter config.

### Brand & content conventions

- Colors are **navy + vinotinto + cream** (from the Instagram brand). Use the brand Tailwind
  utilities (`bg-brand-navy`, `text-brand-navy`, `bg-brand-navy-deep`, `bg-brand-wine`,
  `text-brand-wine`, `bg-brand-cream` / `bg-brand-tint`, …) rather than hardcoded hex.
  `brand-blue*` is an alias of the wine accent for backwards compatibility. The dashboard
  sidebar uses the shadcn `sidebar-*` tokens (deep navy).
- **UI copy is Spanish (neutral/professional).** Code, identifiers, and types are English.
- Source brand material (logos, pricing flyers, the packages PDF) lives in `assets/` — it is
  reference, not served. The catalog text in `features/servicios/data.ts` was transcribed
  from it; keep them in sync if the assets change.
- Icons are referenced by **string name** in data (`features/servicios/data.ts`,
  `lib/dashboard-nav.ts`) and resolved to lucide components via a local `iconMap` in the
  consuming component. Add new icons to that map.

## Deploy

`bun run deploy` runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy`.
Requires Cloudflare auth (`wrangler login` / `CLOUDFLARE_API_TOKEN`).

Config lives in `wrangler.jsonc` (Worker `legalgor`, custom domains `grupolegalgor.com` +
`www.grupolegalgor.com`, `nodejs_compat`). Do not use vinext or hand-wire `@cloudflare/vite-plugin`.

## Status / next steps

Landing and dashboard are built with **sample/demo data** (`features/*/data.ts`) — there is no
backend yet. The dashboard reads obligations/clients/trámites from those seed files anchored to a
fixed `TODAY`. Real next steps:

- **Persistence:** wire Cloudflare KV/D1 (Workers bindings). First user is `/configuracion`
  (contact/location currently edits in-memory only) and the demo data in `features/`.
- **CRUD:** clientes (RIF, régimen), trámite stage transitions, obligation generation per régimen
  (IVA quincenal vs mensual), billing.
- The landing contact form composes a **WhatsApp** message (`whatsappUrl`) and opens wa.me — no
  server submission. Swap to a real handler if email/CRM capture is needed.
