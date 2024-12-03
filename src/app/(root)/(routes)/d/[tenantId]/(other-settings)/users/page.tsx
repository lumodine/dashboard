import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import { Building2, Users } from "lucide-react";
import Link from "next/link";

type TenantUsersPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantUsersPage({ params }: TenantUsersPageProps) {
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
                title={"Kullanıcılar"}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: Users,
                        title: "Kullanıcılar",
                    }
                ]}
            />

            <section className="container">
                TenantUsersPage
            </section>
        </>
    );
}
