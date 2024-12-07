import {Building2, Settings} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {RemoveTenantForm} from "@/components/tenant/remove-tenant-form";
import {UpdateTenantSettingsForm} from "@/components/tenant/update-tenant-settings-form";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantGeneralSettingsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantGeneralSettingsPage({params}: TenantGeneralSettingsPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        description={"İşletmenize ait genel ayarları buradan güncelleyebilirsiniz."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Genel ayarlar"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Settings,
            title: "Genel ayarlar",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full flex flex-col gap-4">
            <UpdateTenantSettingsForm tenant={tenant} />
            <RemoveTenantForm tenant={tenant} />
          </div>
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
