# LegalGor

Sistema web de **LegalGor** — asesoría contable, tributaria y legal en Venezuela.

- **Marketing:** `https://grupolegalgor.com`
- **Admin:** `https://admin.grupolegalgor.com` (Better Auth + 2FA TOTP/QR)
- **Plataforma:** `https://plataforma.grupolegalgor.com` (portal clientes)

Stack: **Next.js 16** + React 19 + Tailwind v4 + shadcn/ui → **Cloudflare Workers**
(OpenNext). Auth/DB: **Better Auth** + **Neon Postgres** (`legalgor_dev` en desarrollo).
Gestor de paquetes: **Bun**.

## Desarrollo

```bash
bun install
cp .env.example .env   # rellenar DATABASE_URL + BETTER_AUTH_SECRET
bun run db:push        # schema Drizzle → Neon
bun run db:seed        # admin@ / usuario@ legalgor.com
bun run dev            # http://localhost:3000
```

Rutas locales (subdominios de dev):

- Admin: `http://admin.localhost:3000/entrar` → `/dashboard`
- Plataforma: `http://plataforma.localhost:3000/entrar` → `/`

En producción las URLs no llevan `/admin` ni `/plataforma` — solo el subdominio.

## Scripts

| Script | Descripción |
| --- | --- |
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build Next.js |
| `bun run preview` | OpenNext + preview workerd |
| `bun run deploy` | OpenNext + deploy Workers |
| `bun run db:push` | Empuja schema a Neon |
| `bun run db:seed` | Seeds de auth de prueba |
| `bun run db:studio` | Drizzle Studio |
| `bun run typecheck` | `tsc --noEmit` |

## Secretos (nunca en git)

`.env` / `.dev.vars` locales. En Cloudflare:

```bash
bunx wrangler secret put DATABASE_URL
bunx wrangler secret put BETTER_AUTH_SECRET
bunx wrangler secret put ADMIN_IP_ALLOWLIST   # opcional, IPs admin
```

`BETTER_AUTH_URL` y `BETTER_AUTH_TRUSTED_ORIGINS` van en `wrangler.jsonc` → `vars`.

Cuando haya clientes reales: crear DB Neon `legalgor` y cambiar solo `DATABASE_URL`.

## Cuentas de prueba (dev)

| Portal | Correo | Clave |
| --- | --- | --- |
| Admin | `admin@legalgor.com` | `legalgor123` |
| Plataforma | `usuario@legalgor.com` | `legalgor123` |

El admin debe asociar un autenticador (QR) en el primer acceso.

Ver [`CLAUDE.md`](./CLAUDE.md) para arquitectura.
