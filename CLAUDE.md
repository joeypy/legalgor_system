# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

LegalGor is a Venezuelan accounting, tax, and legal services firm. This repo is its
web system: a public **landing** (marketing + service catalog) and an authenticated-style
**dashboard** (internal management shell). The app is built on **vinext** — Cloudflare's
Vite-based reimplementation of the Next.js App Router API surface — and deploys to
**Cloudflare Workers**.

## Commands

```bash
pnpm run dev:vinext     # vinext dev server on http://localhost:3001 (primary dev command)
pnpm run build:vinext   # production build for Cloudflare Workers (outputs to dist/)
pnpm run start:vinext   # serve the production build locally
pnpm run deploy         # vinext deploy -> Cloudflare Workers (uses wrangler.jsonc)
pnpm run typecheck      # tsc --noEmit
pnpm run lint           # eslint (flat config, eslint-config-next)
```

- The plain `next` scripts (`dev`/`build`/`start`) are kept by vinext as a fallback but the
  project targets the **`:vinext`** scripts. Develop and verify with those.
- There is no test runner configured yet.
- shadcn components: `npx shadcn@latest add <component>` (config in `components.json`,
  library = **radix**, preset = nova, Tailwind v4).

## Stack

- **vinext** `^0.0.55` on **Vite 8** (App Router conventions: the `app/` directory at the repo root).
- **React 19** + **TypeScript**, **RSC** enabled (`rsc: true`).
- **Tailwind v4** (CSS-first, no `tailwind.config`) via the **`@tailwindcss/vite`** plugin
  (not PostCSS — PostCSS's `@import "tailwindcss"` resolution breaks in the Workers build).
- **shadcn/ui** primitives in `components/ui/`, icons from **lucide-react**.
- Import alias **`@/*` → repo root** (e.g. `@/components`, `@/features`, `@/lib`).

> vinext is experimental (~94% of the Next.js 16 API surface). Stay on well-trodden App
> Router features; avoid bleeding-edge Next APIs. lucide-react is excluded from Vite dep
> pre-bundling in `vite.config.ts` to keep the RSC/client optimizer consistent.

## Architecture

Pragmatic, **feature-first** (intended to evolve toward hexagonal as domains harden — not
ports-&-adapters yet).

- `app/` — vinext App Router.
  - `app/page.tsx` — the **landing**, composed from `components/landing/*` sections.
  - `app/paquetes/[slug]/page.tsx` — per-package detail page (slug = numeric Ref, e.g.
    `/paquetes/310`); uses `generateStaticParams`. `params` is a **Promise** (Next 16 — await it).
  - `app/(dashboard)/` — route group for the internal panel. `layout.tsx` renders the sidebar
    shell; pages: `/dashboard` (Hoy), `/vencimientos`, `/clientes`, `/tramites`, `/servicios`
    (Catálogo), `/configuracion`.
  - `app/globals.css` — Tailwind entry + the **navy/white brand theme** and **fiscal status
    tokens** as CSS variables (`--brand-*`, `--status-ok|warn|late`) mapped via `@theme inline`.
- `features/` — feature-first domains, each `types.ts` + `data.ts`, single source of truth:
  - `servicios/` — service lines + registration packages (+ `packageSlug`/`formatUsd`).
  - `clientes/` — sample clients with `regimen` (ordinario/especial).
  - `vencimientos/` — fiscal obligations + `fiscalStatus`/`venceLabel` anchored to a fixed
    `TODAY` constant (deterministic demo). `statusMeta` maps status → colour utilities.
  - `tramites/` — registration pipeline `etapas` + sample trámites.
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

### Brand & content conventions

- Colors are **navy + white**. Use the brand Tailwind utilities (`bg-brand-navy`,
  `text-brand-navy`, `bg-brand-navy-deep`, `text-brand-blue`, `bg-brand-tint`, …) rather
  than hardcoded hex. The dashboard sidebar uses the shadcn `sidebar-*` tokens (deep navy).
- **UI copy is Spanish (neutral/professional).** Code, identifiers, and types are English.
- Source brand material (logos, pricing flyers, the packages PDF) lives in `assets/` — it is
  reference, not served. The catalog text in `features/servicios/data.ts` was transcribed
  from it; keep them in sync if the assets change.
- Icons are referenced by **string name** in data (`features/servicios/data.ts`,
  `lib/dashboard-nav.ts`) and resolved to lucide components via a local `iconMap` in the
  consuming component. Add new icons to that map.

## Deploy

`pnpm run deploy` runs `vinext deploy`, which generates the Cloudflare Workers wiring
(the `cloudflare()` Vite plugin config + `wrangler.jsonc`) on first run and publishes the
worker. Cloudflare auth (`wrangler login` / `CLOUDFLARE_API_TOKEN`) is required.

> Do **not** hand-add `wrangler.jsonc` + the `cloudflare()` plugin to `vite.config.ts`
> yourself: that flips `vinext build` into Workers mode but breaks `vinext dev` (every route
> 404s). Let `vinext deploy` own that wiring. `@cloudflare/vite-plugin` and `wrangler` are
> already installed for it.

## Status / next steps

Landing and dashboard are built with **sample/demo data** (`features/*/data.ts`) — there is no
backend yet. The dashboard reads obligations/clients/trámites from those seed files anchored to a
fixed `TODAY`. Real next steps:

- **Persistence:** wire Cloudflare KV/D1 (vinext → Workers). First user is `/configuracion`
  (contact/location currently edits in-memory only) and the demo data in `features/`.
- **CRUD:** clientes (RIF, régimen), trámite stage transitions, obligation generation per régimen
  (IVA quincenal vs mensual), billing.
- The landing contact form composes a **WhatsApp** message (`whatsappUrl`) and opens wa.me — no
  server submission. Swap to a real handler if email/CRM capture is needed.
