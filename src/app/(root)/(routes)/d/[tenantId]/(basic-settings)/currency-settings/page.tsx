import {Banknote, Building2} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {UpdateTenantCurrencySettingsForm} from "@/components/tenant/update-tenant-currency-settings-form";
import currencyService from "@/services/currency.service";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantCurrencySettingsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantCurrencySettingsPage({
  params,
}: TenantCurrencySettingsPageProps) {
  const {tenantId} = await params;
  const [{data: currencies}, {data: tenant}] = await Promise.all([
    currencyService.getAll(),
    tenantService.getById(tenantId),
  ]);

  return (
    <>
      <Hero
        description={"Choose the appropriate currencies to manage your prices and transactions."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Currency settings"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Banknote,
            title: "Currency settings",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UpdateTenantCurrencySettingsForm currencies={currencies} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
