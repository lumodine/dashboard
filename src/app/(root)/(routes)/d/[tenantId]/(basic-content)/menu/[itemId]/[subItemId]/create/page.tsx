import Link from "next/link";
import {notFound} from "next/navigation";
import {Box, Building2, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import tagService from "@/services/tag.service";
import itemService from "@/services/item.service";
import {CreateProductVariantForm} from "@/components/productVariant/create-product-variant-form";

type TenantMenuProductVariantsPageProps = {
  params: Promise<{
    tenantId: string;
    itemId: string;
    subItemId: string;
  }>;
};

export default async function TenantMenuProductVariantsPage({
  params,
}: TenantMenuProductVariantsPageProps) {
  const {tenantId, itemId, subItemId} = await params;

  const [{data: tenant}, {data: item}, {data: subItem}] = await Promise.all([
    tenantService.getById(tenantId),
    itemService.getById(tenantId, itemId),
    itemService.getById(tenantId, subItemId),
    tagService.getAll(tenantId),
  ]);

  if (!item || !subItem) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Create variant"}
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
            title: item.translations[0].title,
            href: `/d/${tenantId}/menu/${item._id}`,
          },
          {
            icon: Box,
            title: subItem.translations[0].title,
            href: `/d/${tenantId}/menu/${item._id}/${subItem._id}`,
          },
          {
            icon: Box,
            title: "Create variant",
          },
        ]}
      />

      <section className="container">
        <CreateProductVariantForm itemId={itemId} subItemId={subItemId} tenant={tenant} />
      </section>
    </>
  );
}
