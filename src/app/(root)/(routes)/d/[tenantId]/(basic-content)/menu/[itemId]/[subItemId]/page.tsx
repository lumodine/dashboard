import Link from "next/link";
import {notFound} from "next/navigation";
import {Box, Building2, Plus, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {UpdateProductForm} from "@/components/product/update-product-form";
import {RemoveProductForm} from "@/components/product/remove-product-form";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import tagService from "@/services/tag.service";
import {ITEM_KINDS} from "@/constants/item";
import itemService from "@/services/item.service";
import {UpdateSubCategoryForm} from "@/components/subCategory/update-sub-category-form";
import {RemoveSubCategoryForm} from "@/components/subCategory/remove-sub-category-form";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UpdateProductTagsForm} from "@/components/product/update-product-tags-form";
import {ProductVariantList} from "@/components/productVariant/product-variant-list";
import {Button} from "@/components/ui/button";

type TenantMenuProductsPageProps = {
  params: Promise<{
    tenantId: string;
    itemId: string;
    subItemId: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function TenantMenuProductsPage({
  params,
  searchParams,
}: TenantMenuProductsPageProps) {
  const {tenantId, itemId, subItemId} = await params;
  const {tab} = await searchParams;

  const [{data: tenant}, {data: item}, {data: subItem}, {data: tags}] = await Promise.all([
    tenantService.getById(tenantId),
    itemService.getById(tenantId, itemId),
    itemService.getById(tenantId, subItemId),
    tagService.getAll(tenantId),
  ]);

  if (!item || !subItem) {
    return notFound();
  }

  let variants = [];

  if (subItem.kind === ITEM_KINDS.PRODUCT) {
    variants = subItem?.childItems.filter(
      (childItem: any) => childItem.kind === ITEM_KINDS.PRODUCT_VARIANT,
    );
  }

  const basePath = `/d/${tenant._id}/menu/${item._id}/${subItem._id}`;

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={subItem.translations[0].title}
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
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full">
            {subItem.kind === ITEM_KINDS.PRODUCT && (
              <Tabs className="w-full" defaultValue={tab || "general"}>
                <TabsList>
                  <TabsTrigger asChild value="general">
                    <Link href={basePath}>General</Link>
                  </TabsTrigger>
                  <TabsTrigger asChild value="tags">
                    <Link href={`${basePath}?tab=tags`}>Tags</Link>
                  </TabsTrigger>
                  <TabsTrigger asChild value="variants">
                    <Link href={`${basePath}?tab=variants`}>Variants</Link>
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="flex flex-col gap-4" value="general">
                  <UpdateProductForm product={subItem} tenant={tenant} />
                  <RemoveProductForm category={item} product={subItem} tenant={tenant} />
                </TabsContent>
                <TabsContent value="tags">
                  <UpdateProductTagsForm product={subItem} tags={tags} tenant={tenant} />
                </TabsContent>
                <TabsContent value="variants">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    <Link href={`${basePath}/create`}>
                      <Button size={"sm"}>
                        <Plus size={14} /> Create variants
                      </Button>
                    </Link>

                    <ProductVariantList tenant={tenant} variants={variants} />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            {subItem.kind === ITEM_KINDS.SUB_CATEGORY && (
              <div className="flex flex-col gap-4">
                <UpdateSubCategoryForm subCategory={subItem} tenant={tenant} />
                <RemoveSubCategoryForm subCategory={subItem} tenant={tenant} />
              </div>
            )}
          </div>
          <TenantIframe path={`/${itemId}`} tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
