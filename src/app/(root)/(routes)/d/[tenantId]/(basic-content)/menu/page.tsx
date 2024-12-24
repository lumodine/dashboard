import Link from "next/link";
import {Building2, Plus, SquareMenu} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import itemService from "@/services/item.service";
import {ItemList} from "@/components/item/item-list";
import {Button} from "@/components/ui/button";

type TenantMenuPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantMenuPage({params}: TenantMenuPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: items}] = await Promise.all([
    tenantService.getById(tenantId),
    itemService.getAll(tenantId),
  ]);

  return (
    <>
      <Hero
        description={
          "Customize your menu and add categories and products specific to your business."
        }
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Menu"}
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
          },
        ]}
      />

      <section className="container">
        <div className="inline-flex gap-2 justify-start items-center mb-3">
          <Link href={`/d/${tenant._id}/menu/create`}>
            <Button size={"sm"}>
              <Plus size={14} /> New category
            </Button>
          </Link>
        </div>

        <TenantIframeGroup>
          <ItemList items={items} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
