import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { TenantIframe } from "@/components/app/tenant";
import { UpdateTenantCurrencySettingsForm } from "@/components/app/update-tenant-currency-settings-form";
import currencyService from "@/services/currency.service";
import tenantService from "@/services/tenant.service";

type TenantLanguageSettingsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantLanguageSettingsPage({
    params,
}: TenantLanguageSettingsPageProps) {
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
