import {Building2, LayoutDashboard} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {UpdateTenantThemeLayoutForm} from "@/components/tenant/update-tenant-theme-layout";

type TenantLayoutPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantLayoutPage({params}: TenantLayoutPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        description={"Experiment with different layout options to optimize your design."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Layout"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: LayoutDashboard,
            title: "Layout",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UpdateTenantThemeLayoutForm tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
