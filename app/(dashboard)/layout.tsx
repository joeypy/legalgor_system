import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Viewport-locked shell: sidebar + topbar stay put, only <main> scrolls.
    <div className="flex h-dvh overflow-hidden bg-muted/40">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
