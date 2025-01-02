import Link from "next/link";
import {notFound} from "next/navigation";
import {Building2, Plus, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ItemList} from "@/components/item/item-list";
import {UpdateCategoryForm} from "@/components/category/update-category-form";
import {RemoveCategoryForm} from "@/components/category/remove-category-form";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import itemService from "@/services/item.service";
import {Button} from "@/components/ui/button";
import {ITEM_KINDS} from "@/constants/item";
import {UpdateTagForm} from "@/components/tag/update-tag-form";
import {RemoveTagForm} from "@/components/tag/remove-tag-form";
import themeService from "@/services/theme.service";

type TenantMenuProductsPageProps = {
  params: Promise<{
    tenantId: string;
    itemId: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function TenantMenuProductsPage({
  params,
  searchParams,
}: TenantMenuProductsPageProps) {
  const {tenantId, itemId} = await params;
  const {tab} = await searchParams;

  const {data: item} = await itemService.getById(tenantId, itemId);

  if (!item) {
    return notFound();
  }

  const [{data: tenant}, {data: items}, {data: colors}] = await Promise.all([
    tenantService.getById(tenantId),
    itemService.getAll(tenantId, itemId),
    item.kind === ITEM_KINDS.TAG && themeService.getAllColors(),
  ]);

  const basePath = `/d/${tenant._id}/menu/${item._id}`;

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={item.translations[0].title}
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
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <Tabs className="w-full" defaultValue={tab || "items"}>
            <TabsList>
              <TabsTrigger asChild value="items">
                <Link href={basePath}>Items</Link>
              </TabsTrigger>
              <TabsTrigger asChild value="settings">
                <Link href={`${basePath}?tab=settings`}>Settings</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-2" value="items">
              <div className="inline-flex gap-2 justify-start items-center">
                <Link href={`/d/${tenant._id}/menu/${item._id}/create`}>
                  <Button size={"sm"}>
                    <Plus size={14} /> Create sub menu
                  </Button>
                </Link>
              </div>

              <ItemList items={items} tenant={tenant} />
            </TabsContent>
            <TabsContent value="settings">
              <div className="flex flex-col gap-4">
                {item.kind === ITEM_KINDS.CATEGORY && (
                  <>
                    <UpdateCategoryForm category={item} tenant={tenant} />
                    <RemoveCategoryForm category={item} tenant={tenant} />
                  </>
                )}
                {item.kind === ITEM_KINDS.TAG && (
                  <>
                    <UpdateTagForm colors={colors} tag={item} tenant={tenant} />
                    <RemoveTagForm tag={item} tenant={tenant} />
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <TenantIframe path={`/${itemId}`} tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
