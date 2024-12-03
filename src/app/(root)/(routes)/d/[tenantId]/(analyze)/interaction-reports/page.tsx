import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import { Building2, ChartBar } from "lucide-react";
import Link from "next/link";

type TenantInteractionReportsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantInteractionReportsPage({ params }: TenantInteractionReportsPageProps) {
    const { tenantId } = await params;
    const { data: tenant } = await tenantService.getById(tenantId);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Etkileşim raporları"}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: ChartBar,
                        title: "Etkileşim raporları",
                    }
                ]}
            />

            <section className="container">
                TenantInteractionReportsPage
            </section>
        </>
    );
}
