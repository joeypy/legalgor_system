import { adminPaths, platformPaths } from "@/lib/app-paths";

export interface DashboardNavItem {
  label: string;
  href: string;
  /** lucide-react icon name. */
  icon: string;
}

/** Bare paths — use on admin.grupolegalgor.com (middleware rewrites to app/admin/*). */
export const adminNav: DashboardNavItem[] = [
  { label: "Hoy", href: adminPaths.dashboard, icon: "CalendarDays" },
  { label: "Chats", href: adminPaths.chats, icon: "MessagesSquare" },
  { label: "Vencimientos", href: adminPaths.vencimientos, icon: "CalendarClock" },
  { label: "Clientes", href: adminPaths.clientes, icon: "Users" },
  { label: "Trámites", href: adminPaths.tramites, icon: "Workflow" },
  { label: "Catálogo", href: adminPaths.servicios, icon: "BookText" },
  { label: "Configuración", href: adminPaths.configuracion, icon: "Settings" },
];

/** @deprecated Use adminNav */
export const dashboardNav = adminNav;

export const platformNav: DashboardNavItem[] = [
  { label: "Inicio", href: platformPaths.home, icon: "LayoutDashboard" },
  { label: "Ajustes", href: platformPaths.ajustes, icon: "Settings" },
];

export function titleForPath(
  pathname: string,
  items: DashboardNavItem[],
  fallback: string,
): string {
  const exact = items.find((item) => item.href === pathname);
  if (exact) return exact.label;
  const nested = items.find(
    (item) => item.href !== "/" && pathname.startsWith(`${item.href}/`),
  );
  return nested?.label ?? fallback;
}
