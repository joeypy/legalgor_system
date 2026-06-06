export interface DashboardNavItem {
  label: string;
  href: string;
  /** lucide-react icon name. */
  icon: string;
}

export const dashboardNav: DashboardNavItem[] = [
  { label: "Hoy", href: "/dashboard", icon: "CalendarDays" },
  { label: "Vencimientos", href: "/vencimientos", icon: "CalendarClock" },
  { label: "Clientes", href: "/clientes", icon: "Users" },
  { label: "Trámites", href: "/tramites", icon: "Workflow" },
  { label: "Catálogo", href: "/servicios", icon: "BookText" },
  { label: "Configuración", href: "/configuracion", icon: "Settings" },
];
