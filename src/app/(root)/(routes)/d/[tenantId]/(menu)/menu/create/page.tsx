import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { CreateCategoryForm } from "@/components/category/create-category-form";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantCreateCategoryPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantCreateCategoryPage({
    params,
}: TenantCreateCategoryPageProps) {
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
                title={"Kategori ekle"}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Menü",
                        href: `/d/${tenantId}/menu`
                    },
                    {
                        title: "Kategori ekle",
                    }
                ]}
            />

            <section className="container">
                <CreateCategoryForm
                    tenant={tenant}
                />
            </section>
        </>
    );
}
