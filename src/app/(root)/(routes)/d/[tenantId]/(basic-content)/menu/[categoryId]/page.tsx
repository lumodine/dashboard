import Link from "next/link";
import {notFound} from "next/navigation";
import {Building2, Landmark, Plus, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ItemList} from "@/components/item/item-list";
import {UpdateCategoryForm} from "@/components/category/update-category-form";
import {RemoveCategoryForm} from "@/components/category/remove-category-form";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import itemService from "@/services/item.service";
import {Button} from "@/components/ui/button";

type TenantMenuProductsPageProps = {
  params: Promise<{
    tenantId: string;
    categoryId: string;
  }>;
};

export default async function TenantMenuProductsPage({params}: TenantMenuProductsPageProps) {
  const {tenantId, categoryId} = await params;

  const [{data: tenant}, {data: category}, {data: items}] = await Promise.all([
    tenantService.getById(tenantId),
    categoryService.getById(tenantId, categoryId),
    itemService.getAll(tenantId, categoryId),
  ]);

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={category.translations[0].title}
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
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <Tabs className="w-full" defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-2" value="products">
              <div className="inline-flex gap-2 justify-start items-center">
                <Link href={`/d/${tenant._id}/translate-all-contents?item=${category._id}`}>
                  <Button size={"sm"} variant={"secondary"}>
                    <TableOfContents size={14} /> Translate contents
                  </Button>
                </Link>
                <Link href={`/d/${tenant._id}/update-all-amounts?item=${category._id}`}>
                  <Button size={"sm"} variant={"secondary"}>
                    <Landmark size={14} /> Update amounts
                  </Button>
                </Link>
              </div>
              <div className="inline-flex gap-2 justify-start items-center">
                <Link href={`/d/${tenant._id}/menu/${category._id}/create-product`}>
                  <Button size={"sm"}>
                    <Plus size={14} /> New product
                  </Button>
                </Link>
              </div>

              <ItemList items={items} tenant={tenant} />
            </TabsContent>
            <TabsContent value="settings">
              <div className="flex flex-col gap-4">
                <UpdateCategoryForm category={category} tenant={tenant} />
                <RemoveCategoryForm category={category} tenant={tenant} />
              </div>
            </TabsContent>
          </Tabs>
          <TenantIframe path={`/${categoryId}`} tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
