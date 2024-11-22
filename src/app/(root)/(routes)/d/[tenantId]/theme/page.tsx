import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { TenantIframe } from "@/components/app/tenant";
import { UpdateTenantThemeForm } from "@/components/app/update-tenant-theme-form";
import tenantService from "@/services/tenant.service";

type TenantThemePageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantThemePage({
    params,
}: TenantThemePageProps) {
    const { tenantId } = await params;
    const [
        { data: tenant },
        { data: themes }
    ] = await Promise.all([
        tenantService.getById(tenantId),
        tenantService.getAllThemes(),
    ]);

    return (
        <>
            <Hero
                title={"Tema ayarları"}
                description={"İşletmenize ait tema ayarlarını buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Tema ayarları",
                    }
                ]}
            />

            <section className="container flex flex-col lg:flex-row gap-4">
                <UpdateTenantThemeForm
                    tenant={tenant}
                    themes={themes}
                />
                <TenantIframe
                    tenant={tenant}
                />
            </section>
        </>
    );
}
