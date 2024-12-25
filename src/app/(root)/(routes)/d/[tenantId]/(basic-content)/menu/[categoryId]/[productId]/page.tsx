import Link from "next/link";
import {notFound} from "next/navigation";
import {Box, Building2, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import productService from "@/services/product.service";
import {UpdateProductForm} from "@/components/product/update-product-form";
import {RemoveProductForm} from "@/components/product/remove-product-form";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import tagService from "@/services/tag.service";

type TenantMenuProductsPageProps = {
  params: Promise<{
    tenantId: string;
    categoryId: string;
    productId: string;
  }>;
};

export default async function TenantMenuProductsPage({params}: TenantMenuProductsPageProps) {
  const {tenantId, categoryId, productId} = await params;

  const [{data: tenant}, {data: categories}, {data: category}, {data: product}, {data: tags}] =
    await Promise.all([
      tenantService.getById(tenantId),
      categoryService.getAll(tenantId),
      categoryService.getById(tenantId, categoryId),
      productService.getById(tenantId, productId),
      tagService.getAll(tenantId),
    ]);

  if (!category || !product) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={product.translations[0].title}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: SquareMenu,
            title: "Menu",
            href: `/d/${tenantId}/menu`,
          },
          {
            icon: TableOfContents,
            title: category.translations[0].title,
            href: `/d/${tenantId}/menu/${category._id}`,
          },
          {
            icon: Box,
            title: product.translations[0].title,
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full flex flex-col gap-4">
            <UpdateProductForm
              categories={categories}
              category={category}
              product={product}
              tags={tags}
              tenant={tenant}
            />
            <RemoveProductForm category={category} product={product} tenant={tenant} />
          </div>
          <TenantIframe path={`/${categoryId}`} tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
