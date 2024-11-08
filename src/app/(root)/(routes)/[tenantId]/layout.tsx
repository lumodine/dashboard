import authService from "@/services/auth.service";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import tenantService from "@/services/tenant.service";
import { notFound } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: {
    tenantId: string,
  };
};

export default async function DashboardLayout({
  children,
  params,
}: Readonly<DashboardLayoutProps>) {
  const [authMe, tenantAll] = await Promise.all([
    authService.me(),
    tenantService.getAll()
  ]);

  if (!tenantAll.success || !authMe.success) {
    return notFound();
  }

  const tenant = tenantAll.data.find(tenant => tenant._id === params.tenantId);
  if (!tenant) {
    notFound()
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        tenant={tenant}
        tenants={tenantAll.data}
        user={authMe.data}
      />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
