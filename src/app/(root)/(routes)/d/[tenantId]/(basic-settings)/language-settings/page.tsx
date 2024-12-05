import {Building2, Globe} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {UpdateTenantLanguageSettingsForm} from "@/components/tenant/update-tenant-language-settings-form";
import languageService from "@/services/language.service";
import tenantService from "@/services/tenant.service";

type TenantLanguageSettingsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantLanguageSettingsPage({
  params,
}: TenantLanguageSettingsPageProps) {
  const {tenantId} = await params;
  const [{data: languages}, {data: tenant}] = await Promise.all([
    languageService.getAll(),
    tenantService.getById(tenantId),
  ]);

  return (
    <>
      <Hero
        description={"İşletmenize ait dil ayarlarını buradan güncelleyebilirsiniz."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Dil ayarları"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Globe,
            title: "Dil ayarları",
          },
        ]}
      />

      <section className="container">
        <UpdateTenantLanguageSettingsForm languages={languages} tenant={tenant} />
      </section>
    </>
  );
}
