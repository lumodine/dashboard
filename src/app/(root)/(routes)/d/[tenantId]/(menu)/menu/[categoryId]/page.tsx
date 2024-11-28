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
import { RemoveCategoryForm } from "@/components/category/remove-category-form";
import { Building2, SquareMenu, TableOfContents } from "lucide-react";

type TenantMenuProductsPageProps = {
    params: Promise<{
        tenantId: string;
        categoryId: string;
    }>;
};

export default async function TenantMenuProductsPage({
    params,
}: TenantMenuProductsPageProps) {
    const {
        tenantId,
        categoryId
    } = await params;

    const [
        { data: tenant },
        { data: category },
        { data: products },
    ] = await Promise.all([
        tenantService.getById(tenantId),
        categoryService.getById(tenantId, categoryId),
        productService.getAll(tenantId, categoryId),
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
                title={category.translations[0].name}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: SquareMenu,
                        title: "Menü",
                        href: `/d/${tenantId}/menu`
                    },
                    {
                        icon: TableOfContents,
                        title: category.translations[0].name,
                    },
                ]}
            />

            <section className="container">
                <Tabs defaultValue="products">
                    <TabsList>
                        <TabsTrigger value="products">
                            Ürünler
                        </TabsTrigger>
                        <TabsTrigger value="settings">
                            Ayarlar
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                        <ProductList
                            tenant={tenant}
                            category={category}
                            products={products}
                        />
                    </TabsContent>
                    <TabsContent value="settings">
                        <div className="flex flex-col gap-4">
                            <UpdateCategoryForm
                                tenant={tenant}
                                category={category}
                            />
                            <RemoveCategoryForm
                                tenant={tenant}
                                category={category}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </>
    );
}
