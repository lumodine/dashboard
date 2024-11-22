import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { TenantIframe } from "@/components/tenant/tenant-iframe";
import { UpdateTenantCurrencySettingsForm } from "@/components/tenant/update-tenant-currency-settings-form";
import currencyService from "@/services/currency.service";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantCurrencySettingsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantCurrencySettingsPage({
    params,
}: TenantCurrencySettingsPageProps) {
    const { tenantId } = await params;
    const [
        { data: currencies },
        { data: tenant },
    ] = await Promise.all([
        currencyService.getAll(),
        tenantService.getById(tenantId),
    ]);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Para birimi ayarları"}
                description={"İşletmenize ait para birimi ayarlarını buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Para birimi ayarları",
                    }
                ]}
            />

            <section className="container flex flex-col lg:flex-row gap-4">
                <UpdateTenantCurrencySettingsForm
                    currencies={currencies}
                    tenant={tenant}
                />
                <TenantIframe
                    tenant={tenant}
                />
            </section>
        </>
    );
}
