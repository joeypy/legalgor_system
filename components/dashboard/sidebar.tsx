"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  CalendarClock,
  CalendarDays,
  Settings,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { dashboardNav } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  CalendarDays,
  CalendarClock,
  Users,
  Workflow,
  BookText,
  Settings,
};

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/">
          <Logo variant="light" />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 p-4">
        {dashboardNav.map((item) => {
          const Icon = iconMap[item.icon] ?? CalendarDays;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-sidebar-border p-4">
        <div className="space-y-1.5 text-xs text-sidebar-foreground/60">
          <p className="font-medium uppercase tracking-wider text-sidebar-foreground/45">
            Régimen
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-sidebar-primary" />
            Especial · IVA quincenal
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-sidebar-foreground/40" />
            Ordinario · IVA mensual
          </p>
        </div>
        <Link
          href="/"
          className="block text-xs text-sidebar-foreground/55 transition-colors hover:text-sidebar-foreground"
        >
          ← Volver al sitio
        </Link>
      </div>
    </aside>
  );
}
