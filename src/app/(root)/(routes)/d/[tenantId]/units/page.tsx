import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { CreateUnitForm } from "@/components/unit/create-unit-form";
import { Hero } from "@/components/common/hero";
import { UnitList } from "@/components/unit/unit-list";
import tenantService from "@/services/tenant.service";
import unitService from "@/services/unit.service";
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
    const [
        { data: units },
        { data: tenant }
    ] = await Promise.all([
        unitService.getAll(tenantId),
        tenantService.getById(tenantId),
    ]);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Birimler"}
                description={"İşletmenize ait genel ayarları buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Birimler",
                    }
                ]}
            />

            <section className="container">
                <CreateUnitForm
                    tenant={tenant}
                />
            </section>
            <section className="container mt-3">
                <UnitList
                    tenant={tenant}
                    units={units}
                />
            </section>
        </>
    );
}
