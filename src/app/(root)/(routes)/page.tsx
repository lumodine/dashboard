import { Hero } from "@/components/app/hero";
import { TenantList } from "@/components/app/tenant";
import tenantService from "@/services/tenant.service";

export default async function DashboardPage() {
    const { data: tenants } = await tenantService.getAll();

    return (
        <>
            <Hero
                title={process.env.NEXT_PUBLIC_APP_NAME!}
                description={'Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli'}
                image={'https://placehold.co/500x300/png'}
            />
            <main className="container my-4">
                <TenantList
                    tenants={tenants}
                />
            </main>
        </>
    );
}
