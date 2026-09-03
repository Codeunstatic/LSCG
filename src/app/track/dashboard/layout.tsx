import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DashboardLayout({ children }: LayoutProps<"/track/dashboard">) {
  return <DashboardShell>{children}</DashboardShell>;
}
