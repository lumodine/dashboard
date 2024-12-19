import {Building2, Palette} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import {UpdateTenantThemeColorForm} from "@/components/tenant/update-tenant-theme-color-form";
import themeService from "@/services/theme.service";

type TenantThemeColorPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantThemeColorPage({params}: TenantThemeColorPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: colors}] = await Promise.all([
    tenantService.getById(tenantId),
    themeService.getAllColors(),
  ]);

  return (
    <>
      <Hero
        description={"You can update the color palette of your business here."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Color palette"}
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
            title: "Color palette",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UpdateTenantThemeColorForm colors={colors} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
