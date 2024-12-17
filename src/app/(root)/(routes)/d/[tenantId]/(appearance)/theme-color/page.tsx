import {Building2, Palette} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import { UpdateTenantThemeColorForm } from "@/components/tenant/update-tenant-theme-color-form";

type TenantThemeColorPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantThemeColorPage({params}: TenantThemeColorPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: colors}] = await Promise.all([
    tenantService.getById(tenantId),
    tenantService.getAllColors(),
  ]);

  return (
    <>
      <Hero
        description={"You can update the theme color settings of your business here."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Theme Color"}
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
          <UpdateTenantThemeColorForm tenant={tenant} colors={colors} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
