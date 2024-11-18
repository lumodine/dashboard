import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { TenantMenuList } from "@/components/app/tenant";
import tenantService from "@/services/tenant.service";

type TenantPageProps = {
    params: {
        tenantId: string,
    };
};

export default async function TenantPage({ params }: TenantPageProps) {
    const { tenantId } = await params;
    const [
        { data: tenant },
        { data: tenantMenus },
    ] = await Promise.all([
        tenantService.getById(tenantId),
        tenantService.getMenus(tenantId),
    ]);

    return (
        <>
            <Hero
                supTitle={process.env.NEXT_PUBLIC_APP_NAME!}
                title={tenant.name}
                description={tenant.address}
                image={"https://placehold.co/500x300/png"}
            />
            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                    }
                ]}
            />
            <section className="container flex gap-4">
                <TenantMenuList
                    tenant={tenant}
                    menus={tenantMenus}
                />
            </section>
        </>
    );
}
