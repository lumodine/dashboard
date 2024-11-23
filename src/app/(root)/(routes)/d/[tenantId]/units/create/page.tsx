import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { CreateUnitForm } from "@/components/unit/create-unit-form";
import { Hero } from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantUnitPagePageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantUnitPagePage({
    params,
}: TenantUnitPagePageProps) {
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
                title={"Yeni birim ekle"}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Birimler",
                        href: `/d/${tenantId}/units`
                    },
                    {
                        title: "Yeni birim ekle"
                    }
                ]}
            />

            <section className="container mt-3">
                <CreateUnitForm
                    tenant={tenant}
                />
            </section>
        </>
    );
}
