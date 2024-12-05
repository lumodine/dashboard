import {Building2, Palette} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {UpdateTenantThemeForm} from "@/components/tenant/update-tenant-theme-form";
import tenantService from "@/services/tenant.service";

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
        description={"İşletmenize ait tema ayarlarını buradan güncelleyebilirsiniz."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Tema"}
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
            title: "Tema",
          },
        ]}
      />

      <section className="container">
        <UpdateTenantThemeForm tenant={tenant} themes={themes} />
      </section>
    </>
  );
}
