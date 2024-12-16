import Link from "next/link";
import {Building2, SquareMenu} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {CategoryList} from "@/components/category/category-list";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantMenuPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantMenuPage({params}: TenantMenuPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: categories}] = await Promise.all([
    tenantService.getById(tenantId),
    categoryService.getAll(tenantId),
  ]);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Menu"} />

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
        <TenantIframeGroup>
          <CategoryList categories={categories} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
