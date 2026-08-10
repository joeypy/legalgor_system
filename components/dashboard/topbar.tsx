"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  CalendarClock,
  CalendarDays,
  Menu,
  MessagesSquare,
  Search,
  Settings,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dashboardNav } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  CalendarDays,
  CalendarClock,
  Users,
  Workflow,
  BookText,
  Settings,
  MessagesSquare,
};

export function DashboardTopbar({
  title,
  context,
}: {
  title: string;
  context?: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 border-r-0 bg-sidebar text-sidebar-foreground"
          >
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo variant="light" />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-2 space-y-0.5 px-4">
              {dashboardNav.map((item) => {
                const Icon = iconMap[item.icon] ?? CalendarDays;
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
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
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-brand-navy">
            {title}
          </h1>
          {context && (
            <p className="font-mono text-xs text-muted-foreground">{context}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente o RIF..."
            className="w-60 pl-9"
            aria-label="Buscar"
          />
        </div>
        <Avatar className="size-9">
          <AvatarFallback className="bg-brand-navy text-xs font-semibold text-white">
            LG
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
