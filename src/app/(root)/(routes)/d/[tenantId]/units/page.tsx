import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { CreateUnitForm } from "@/components/app/create-unit-form";
import { Hero } from "@/components/app/hero";
import { UnitList } from "@/components/app/unit";
import tenantService from "@/services/tenant.service";
import unitService from "@/services/unit.service";

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
                <h2 className="text-2xl font-semibold mb-3">
                    Birimler
                </h2>
                <UnitList
                    tenant={tenant}
                    units={units}
                />
            </section>
        </>
    );
}
