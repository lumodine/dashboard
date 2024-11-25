import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { CreateProductForm } from "@/components/product/create-product-form";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import Link from "next/link";
import { notFound } from "next/navigation";

type TenantMenuCreateProductPageProps = {
    params: Promise<{
        tenantId: string;
        categoryId: string;
    }>;
};

export default async function TenantMenuCreateProductPage({
    params,
}: TenantMenuCreateProductPageProps) {
    const {
        tenantId,
        categoryId
    } = await params;

    const [
        { data: tenant },
        { data: category },
    ] = await Promise.all([
        tenantService.getById(tenantId),
        categoryService.getById(tenantId, categoryId),
    ]);

    if (!category) {
        return notFound();
    }

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Ürün ekle"}
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
                        title: category.translations[0].name,
                        href: `/d/${tenantId}/menu/${category._id}`
                    },
                    {
                        title: "Ürün ekle",
                    },
                ]}
            />

            <section className="container">
                <CreateProductForm
                    tenant={tenant}
                    category={category}
                />
            </section>
        </>
    );
}
