# LegalGor — Interface Design System (dashboard)

Scope: the internal dashboard (`app/(dashboard)/**`). The public landing has its own
treatment and is out of scope for this file.

## Intent

- **Human:** LegalGor operator (contador/gestor) in Venezuela.
- **Job:** *No perder un vencimiento.* Track each client's fiscal obligations + trámite status.
- **Feel:** sober, precise, calm-under-deadline. Accounting texture comes from **mono tabular
  figures**, not ornament (we chose the minimalist variant — no ruled-grid texture).

## Direction

"Libro contable, minimalista." Navy ink on near-white canvas, hairline borders, figures in
Geist Mono `tabular-nums`. Fiscal status (green/amber/red) is the only colour that carries
meaning. Kraft/manila is the single warm accent, reserved for trámite/document objects.

## Depth

Borders-led: hairline low-opacity borders (`border-border/60`–`/70`) + whisper surface tint
(card sits just above the `muted/40` canvas). `shadow-xs`/`shadow-sm` on cards; shadows only
otherwise on overlays. No dramatic shadows. No ruled grid.

## Color tokens (app/globals.css)

- Brand: `--brand-navy(-deep)`, `--brand-blue(-bright)`, `--brand-sky`, `--brand-tint`, `--brand-kraft`.
- Fiscal status (meaning only): `--status-ok|warn|late` + matching `*-soft` backgrounds.
  Utilities: `text-status-late`, `bg-status-warn-soft`, etc.
- Sidebar uses the shadcn `--sidebar-*` tokens = deep navy (brand choice; active item filled
  with `bg-sidebar-primary`).
- Single hue for surfaces (navy family) — shift lightness, never hue.

## Typography

- Geist (`--font-sans`) for headings/body. Headings: `font-semibold tracking-tight`.
- Geist Mono (`--font-mono`) + `tabular-nums` for ALL figures, dates, montos, RIF, Ref codes.
- Text levels: `text-foreground` → `text-muted-foreground` → `/70` → `/50`.

## Spacing

Base 4px (Tailwind). Page padding `p-4 sm:p-6`. Section gap `space-y-6`. Card padding `p-5 sm:p-6`.
Radius: `rounded-xl` cards, `rounded-lg` inner, `rounded-md`/`rounded-full` badges.

## Signature elements (where craft lives)

1. **RefStamp** (`components/dashboard/ref-stamp.tsx`) — "Ref. NNN" as an official sello
   (navy outline, mono uppercase). Reused for plans, packages, trámites.
2. **StatusBadge** + margin dot (`status-badge.tsx`) — fiscal status, dot in the row margin.
3. **StatusRibbon** (`status-ribbon.tsx`) — overview lead: proportion bar + count/monto, NOT
   identical metric boxes. Leads with "X de Y requieren acción".
4. **VencimientoRow** (`vencimiento-row.tsx`) — minimalist ledger line, status in margin,
   monto + venceLabel in mono, ESP/ORD régimen chip.
5. **TramitePipeline** (`tramite-pipeline.tsx`) — 5-stage board, kraft left accent, segmented
   progress (navy done / blue current / muted pending).

## Patterns

- Tables (clientes, catálogo): wrap in `overflow-hidden rounded-xl border bg-card shadow-sm`,
  header row in a bordered band, body via shadcn `Table`.
- Section header: `components/dashboard/section-header.tsx` (title + meta + optional action).
- Régimen chip: `ESP` = `bg-brand-tint text-brand-navy`, `ORD` = `bg-muted text-muted-foreground`.

## Data model (feature-first, single source of truth)

`features/clientes`, `features/vencimientos` (TODAY-anchored `fiscalStatus`/`venceLabel`),
`features/tramites`, `features/servicios`. Dashboard reads from these — never hardcode.

## Rejected defaults

- 4 identical icon+number+label stat cards → StatusRibbon.
- Generic empty states with a button → real structured ledgers/pipeline with sample data.
- Filled-blue active pill as the only nav idea → operator-model nav (Hoy/Vencimientos/
  Clientes/Trámites/Catálogo).
