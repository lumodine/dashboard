import {Building2, CaseSensitive} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import themeService from "@/services/theme.service";
import {UpdateTenantThemeFontForm} from "@/components/tenant/update-tenant-theme-font-form";

type TenantFontPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantFontPage({params}: TenantFontPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: fonts}] = await Promise.all([
    tenantService.getById(tenantId),
    themeService.getAllFonts(),
  ]);

  return (
    <>
      <Hero
        description={"Get a professional look by choosing fonts that match your brand style."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Font"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: CaseSensitive,
            title: "Font",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UpdateTenantThemeFontForm fonts={fonts} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
