import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { RemoveTenantForm } from "@/components/app/remove-tenant-form";
import { TenantIframe } from "@/components/app/tenant";
import { UpdateTenantSettingsForm } from "@/components/app/update-tenant-settings-form";
import tenantService from "@/services/tenant.service";

type TenantGeneralSettingsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantGeneralSettingsPage({
    params,
}: TenantGeneralSettingsPageProps) {
    const { tenantId } = await params;
    const { data: tenant } = await tenantService.getById(tenantId);

    return (
        <>
            <Hero
                title={"Genel ayarlar"}
                description={"İşletmenize ait genel ayarları buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Genel ayarlar",
                    }
                ]}
            />

            <section className="container flex flex-col gap-4">
                <div className="flex-1 w-full flex flex-col md:flex-row items-start justify-start gap-4">
                    <UpdateTenantSettingsForm
                        tenant={tenant}
                    />
                    <TenantIframe
                        tenant={tenant}
                    />
                </div>
                <RemoveTenantForm
                    tenant={tenant}
                />
            </section>
        </>
    );
}
