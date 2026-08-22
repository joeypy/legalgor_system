"use client";

import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  titleForPath,
  type DashboardNavItem,
} from "@/lib/dashboard-nav";

export function AppTopbar({
  items,
  fallbackTitle,
  context,
}: {
  items: DashboardNavItem[];
  fallbackTitle: string;
  context?: string;
}) {
  const pathname = usePathname();
  const title = titleForPath(pathname, items, fallbackTitle);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-bold tracking-tight text-brand-navy sm:text-lg">
          {title}
        </h1>
        {context ? (
          <p className="truncate font-mono text-xs text-muted-foreground">
            {context}
          </p>
        ) : null}
      </div>
    </header>
  );
}
