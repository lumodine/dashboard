import {Box, Building2, SquareMenu, TableOfContents} from "lucide-react";
import Link from "next/link";
import {notFound} from "next/navigation";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {CreateSubMenuForm} from "@/components/menu/create-sub-menu-form";
import itemService from "@/services/item.service";

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

  const [{data: tenant}, {data: item}] = await Promise.all([
    tenantService.getById(tenantId),
    itemService.getById(tenantId, itemId),
  ]);

  if (!item) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Create sub menu"}
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
            title: "Create sub menu",
          },
        ]}
      />

      <section className="container">
        <CreateSubMenuForm itemId={itemId} tenant={tenant} />
      </section>
    </>
  );
}
