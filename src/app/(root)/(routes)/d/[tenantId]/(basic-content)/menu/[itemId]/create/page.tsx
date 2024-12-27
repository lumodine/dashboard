import {Box, Building2, SquareMenu, TableOfContents} from "lucide-react";
import Link from "next/link";
import {notFound} from "next/navigation";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {CreateProductForm} from "@/components/product/create-product-form";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import tagService from "@/services/tag.service";

type TenantMenuCreateSubItemPageProps = {
  params: Promise<{
    tenantId: string;
    itemId: string;
  }>;
};

export default async function TenantMenuCreateSubItemPage({
  params,
}: TenantMenuCreateSubItemPageProps) {
  const {tenantId, itemId} = await params;

  const [{data: tenant}, {data: category}, {data: tags}] = await Promise.all([
    tenantService.getById(tenantId),
    categoryService.getById(tenantId, itemId),
    tagService.getAll(tenantId),
  ]);

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Add product"} />

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
            title: "Add product",
          },
        ]}
      />

      <section className="container">
        <CreateProductForm category={category} tags={tags} tenant={tenant} />
      </section>
    </>
  );
}
