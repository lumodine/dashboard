import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { TenantIframe } from "@/components/tenant/tenant-iframe";
import { UpdateTenantThemeForm } from "@/components/tenant/update-tenant-theme-form";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

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
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Tema"}
                description={"İşletmenize ait tema ayarlarını buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Tema",
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
