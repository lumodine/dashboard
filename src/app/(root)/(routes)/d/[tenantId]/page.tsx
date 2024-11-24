import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { TenantMenuList } from "@/components/tenant/tenant-menu-list";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantPage({ params }: TenantPageProps) {
    const { tenantId } = await params;
    const { data: tenant } = await tenantService.getById(tenantId);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={"/d"}>
                        {process.env.NEXT_PUBLIC_APP_NAME!}
                    </Link>
                }
                title={tenant.name}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                    }
                ]}
            />

            <section className="container">
                <TenantMenuList
                    tenant={tenant}
                />
            </section>
        </>
    );
}
