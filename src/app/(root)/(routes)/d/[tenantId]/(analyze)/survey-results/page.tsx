import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import { Building2, FileUser } from "lucide-react";
import Link from "next/link";

type TenantSurveyResultsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantSurveyResultsPage({ params }: TenantSurveyResultsPageProps) {
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
                title={"Anket sonuçları"}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: FileUser,
                        title: "Anket sonuçları",
                    }
                ]}
            />

            <section className="container">
                TenantSurveyResultsPage
            </section>
        </>
    );
}
