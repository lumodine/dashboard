import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { TenantIframe } from "@/components/app/tenant";
import { UpdateTenantSettingsForm } from "@/components/app/update-tenant-settings-form";
import tenantService from "@/services/tenant.service";

type TenantUnitPagePageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantUnitPagePage({
    params,
}: TenantUnitPagePageProps) {
    const { tenantId } = await params;
    const { data: tenant } = await tenantService.getById(tenantId);

    return (
        <>
            <Hero
                title={"Birimler"}
                description={"İşletmenize ait genel ayarları buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Birimler",
                    }
                ]}
            />

            <section className="container flex flex-col lg:flex-row gap-4">
                <UpdateTenantSettingsForm
                    tenant={tenant}
                />
                <TenantIframe
                    tenant={tenant}
                />
            </section>
        </>
    );
}
