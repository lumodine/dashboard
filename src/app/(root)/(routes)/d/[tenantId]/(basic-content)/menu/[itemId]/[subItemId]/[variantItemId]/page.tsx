import Link from "next/link";
import {notFound} from "next/navigation";
import {Box, Building2, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import itemService from "@/services/item.service";
import {RemoveProductVariantForm} from "@/components/productVariant/remove-product-variant-form";
import {UpdateProductVariantForm} from "@/components/productVariant/update-product-variant-form";

type TenantMenuProductVariantPageProps = {
  params: Promise<{
    tenantId: string;
    itemId: string;
    subItemId: string;
    variantItemId: string;
  }>;
};

export default async function TenantMenuProductVariantPage({
  params,
}: TenantMenuProductVariantPageProps) {
  const {tenantId, itemId, subItemId, variantItemId} = await params;

  const [{data: tenant}, {data: item}, {data: subItem}, {data: variant}] = await Promise.all([
    tenantService.getById(tenantId),
    itemService.getById(tenantId, itemId),
    itemService.getById(tenantId, subItemId),
    itemService.getById(tenantId, variantItemId),
  ]);

  if (!item || !subItem || !variant) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={variant.translations[0].title}
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
            title: variant.translations[0].title,
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full flex flex-col gap-4">
            <UpdateProductVariantForm tenant={tenant} variant={variant} />
            <RemoveProductVariantForm
              category={item}
              product={subItem}
              tenant={tenant}
              variant={variant}
            />
          </div>
          <TenantIframe path={`/${itemId}`} tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
