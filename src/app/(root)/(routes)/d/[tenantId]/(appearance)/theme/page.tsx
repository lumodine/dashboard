import {Building2, Palette} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {UpdateTenantThemeForm} from "@/components/tenant/update-tenant-theme-form";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantThemePageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantThemePage({params}: TenantThemePageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: themes}] = await Promise.all([
    tenantService.getById(tenantId),
    tenantService.getAllThemes(),
  ]);

  return (
    <>
      <Hero
        description={"You can update the theme settings of your business here."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Theme"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Palette,
            title: "Theme",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UpdateTenantThemeForm tenant={tenant} themes={themes} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
