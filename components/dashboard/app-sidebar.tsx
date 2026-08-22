"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  CalendarClock,
  CalendarDays,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { SidebarUserMenu } from "@/components/dashboard/user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { DashboardNavItem } from "@/lib/dashboard-nav";

const iconMap: Record<string, LucideIcon> = {
  CalendarDays,
  CalendarClock,
  Users,
  Workflow,
  BookText,
  Settings,
  MessagesSquare,
  LayoutDashboard,
};

function isActivePath(pathname: string, href: string, homeHref: string) {
  if (href === homeHref) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({
  items,
  homeHref,
  brandLabel,
  siteHref,
  user,
  signOutPath,
  settingsHref,
}: {
  items: DashboardNavItem[];
  homeHref: string;
  brandLabel: string;
  siteHref: string;
  user: { name?: string | null; email: string };
  signOutPath: string;
  settingsHref?: string;
}) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="LegalGor">
              <Link href={homeHref}>
                <Logo variant="light" markOnly className="[&_img]:size-8" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-wide">
                    LEGALGOR
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/65">
                    {brandLabel}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = iconMap[item.icon] ?? LayoutDashboard;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActivePath(pathname, item.href, homeHref)}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarUserMenu
          name={user.name}
          email={user.email}
          signOutPath={signOutPath}
          settingsHref={settingsHref}
          siteHref={siteHref}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
