import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantMenuPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantMenuPage({
    params,
}: TenantMenuPageProps) {
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
                title={"Menü"}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Menü",
                    }
                ]}
            />
        </>
    );
}
