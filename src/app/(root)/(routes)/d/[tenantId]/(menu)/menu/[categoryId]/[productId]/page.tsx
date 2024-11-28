import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { ProductList } from "@/components/product/product-list";
import productService from "@/services/product.service";
import { UpdateCategoryForm } from "@/components/category/update-category-form";
import { UpdateProductForm } from "@/components/product/update-product-form";
import { RemoveProductForm } from "@/components/product/remove-product-form";

type TenantMenuProductsPageProps = {
    params: Promise<{
        tenantId: string;
        categoryId: string;
        productId: string;
    }>;
};

export default async function TenantMenuProductsPage({
    params,
}: TenantMenuProductsPageProps) {
    const {
        tenantId,
        categoryId,
        productId,
    } = await params;

    const [
        { data: tenant },
        { data: category },
        { data: product },
    ] = await Promise.all([
        tenantService.getById(tenantId),
        categoryService.getById(tenantId, categoryId),
        productService.getById(tenantId, categoryId, productId),
    ]);

    if (!category || !product) {
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
                title={product.translations[0].name}
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
                        title: product.translations[0].name,
                    },
                ]}
            />

            <section className="container">
                <Tabs defaultValue="settings">
                    <TabsList>
                        <TabsTrigger value="settings">
                            Ayarlar
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="settings">
                        <div className="flex flex-col gap-4">
                            <UpdateProductForm
                                tenant={tenant}
                                category={category}
                                product={product}
                            />
                            <RemoveProductForm
                                tenant={tenant}
                                category={category}
                                product={product}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </>
    );
}
