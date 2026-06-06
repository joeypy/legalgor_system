# LegalGor

Sistema web de **LegalGor** — asesoría contable, tributaria y legal en Venezuela.
Incluye un **landing** público (catálogo de servicios y paquetes) y un **panel** interno.

Construido con **vinext** (la reimplementación de la API de Next.js sobre Vite, de
Cloudflare), React 19, Tailwind v4 y shadcn/ui. Despliega a **Cloudflare Workers**.

## Desarrollo

```bash
pnpm install
pnpm run dev:vinext     # http://localhost:3001
```

## Scripts

| Script | Descripción |
| --- | --- |
| `pnpm run dev:vinext` | Servidor de desarrollo (vinext) |
| `pnpm run build:vinext` | Build de producción para Cloudflare Workers (`dist/`) |
| `pnpm run start:vinext` | Sirve el build localmente |
| `pnpm run deploy` | `vinext deploy` a Cloudflare Workers (`wrangler.jsonc`) |
| `pnpm run typecheck` | `tsc --noEmit` |
| `pnpm run lint` | ESLint |

## Estructura

- `app/` — App Router. `app/page.tsx` (landing) y `app/(dashboard)/` (panel).
- `features/servicios/` — catálogo de servicios y paquetes (fuente de verdad).
- `components/landing`, `components/dashboard`, `components/ui` (shadcn), `components/brand`.
- `lib/` — `site.ts`, `dashboard-nav.ts`, `utils.ts`.
- `assets/` — material de marca de referencia (no se sirve).

Ver [`CLAUDE.md`](./CLAUDE.md) para detalles de arquitectura y convenciones.
