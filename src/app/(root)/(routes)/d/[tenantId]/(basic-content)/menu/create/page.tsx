import Link from "next/link";
import {Building2, SquareMenu, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {CreateCategoryForm} from "@/components/category/create-category-form";
import tenantService from "@/services/tenant.service";

type TenantCreateCategoryPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantCreateCategoryPage({params}: TenantCreateCategoryPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Kategori ekle"}
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
            title: "Menü",
            href: `/d/${tenantId}/menu`,
          },
          {
            icon: TableOfContents,
            title: "Kategori ekle",
          },
        ]}
      />

      <section className="container">
        <CreateCategoryForm tenant={tenant} />
      </section>
    </>
  );
}
