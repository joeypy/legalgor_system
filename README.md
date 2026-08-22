# LegalGor

Sistema web de **LegalGor** — asesoría contable, tributaria y legal en Venezuela.
Incluye un **landing** público (catálogo de servicios y paquetes) y un **panel** interno.

Construido con **Next.js 16** (App Router), React 19, Tailwind v4 y shadcn/ui.
Despliega a **Cloudflare Workers** con **OpenNext** (`@opennextjs/cloudflare`).
Gestor de paquetes: **Bun**.

## Desarrollo

```bash
bun install
bun run dev     # http://localhost:3000
```

## Scripts

| Script | Descripción |
| --- | --- |
| `bun run dev` | Servidor de desarrollo (Next.js) |
| `bun run build` | Build de producción Next.js |
| `bun run preview` | Build OpenNext + preview local en workerd |
| `bun run deploy` | Build OpenNext + deploy a Cloudflare Workers |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | ESLint |
| `bun run cf-typegen` | Tipos de bindings Cloudflare |

## Dominio

- Producción: `https://grupolegalgor.com`
- `www.grupolegalgor.com` redirige al apex (308)
- Worker: `legalgor` (también `*.workers.dev`)

## Estructura

- `app/` — App Router. `app/page.tsx` (landing) y `app/(dashboard)/` (panel).
- `features/servicios/` — catálogo de servicios y paquetes (fuente de verdad).
- `components/landing`, `components/dashboard`, `components/ui` (shadcn), `components/brand`.
- `lib/` — `site.ts`, `dashboard-nav.ts`, `utils.ts`.
- `assets/` — material de marca de referencia (no se sirve).

Ver [`CLAUDE.md`](./CLAUDE.md) para detalles de arquitectura y convenciones.
