"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { AppTopbar } from "@/components/dashboard/app-topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { hosts } from "@/lib/hosts";
import type { DashboardNavItem } from "@/lib/dashboard-nav";

const marketingSiteUrl = `https://${hosts.apex}`;

export function AppShell({
  items,
  homeHref,
  brandLabel,
  fallbackTitle,
  context,
  user,
  signOutPath,
  settingsHref,
  siteHref = marketingSiteUrl,
  children,
}: {
  items: DashboardNavItem[];
  homeHref: string;
  brandLabel: string;
  fallbackTitle: string;
  context?: string;
  user: { name?: string | null; email: string };
  signOutPath: string;
  settingsHref?: string;
  siteHref?: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar
          items={items}
          homeHref={homeHref}
          brandLabel={brandLabel}
          siteHref={siteHref}
          user={user}
          signOutPath={signOutPath}
          settingsHref={settingsHref}
        />
        <SidebarInset className="min-h-0 overflow-hidden bg-background">
          <AppTopbar
            items={items}
            fallbackTitle={fallbackTitle}
            context={context}
          />
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
