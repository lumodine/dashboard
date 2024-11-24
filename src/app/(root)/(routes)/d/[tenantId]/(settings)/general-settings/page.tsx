import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { RemoveTenantForm } from "@/components/tenant/remove-tenant-form";
import { UpdateTenantSettingsForm } from "@/components/tenant/update-tenant-settings-form";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantGeneralSettingsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantGeneralSettingsPage({
    params,
}: TenantGeneralSettingsPageProps) {
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
                title={"Genel ayarlar"}
                description={"İşletmenize ait genel ayarları buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Genel ayarlar",
                    }
                ]}
            />

            <section className="container flex flex-col gap-2">
                <UpdateTenantSettingsForm
                    tenant={tenant}
                />
                <RemoveTenantForm
                    tenant={tenant}
                />
            </section>
        </>
    );
}
