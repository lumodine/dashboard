import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import { Building2, Contact } from "lucide-react";
import Link from "next/link";

type TenantSocialMediaPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantSocialMediaPage({ params }: TenantSocialMediaPageProps) {
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
                title={"Sosyal medya"}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: Contact,
                        title: "Sosyal medya",
                    }
                ]}
            />

            <section className="container">
                TenantSocialMediaPage
            </section>
        </>
    );
}
