import Link from "next/link";
import {Building2, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {CreateMenuForm} from "@/components/menu/create-menu-form";

type TenantCreateMenuPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantCreateMenuPage({params}: TenantCreateMenuPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Create menu"} />

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
            title: "Create menu",
          },
        ]}
      />

      <section className="container">
        <CreateMenuForm tenant={tenant} />
      </section>
    </>
  );
}
