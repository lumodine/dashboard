import { Hero } from "@/components/common/hero";
import { TenantList } from "@/components/tenant/tenant-list";
import tenantService from "@/services/tenant.service";

export default async function DashboardPage() {
    const { data: tenants } = await tenantService.getAll();

    return (
        <>
            <Hero
                title={process.env.NEXT_PUBLIC_APP_NAME!}
            />
            
            <main className="container my-4">
                <TenantList
                    tenants={tenants}
                />
            </main>
        </>
    );
}
