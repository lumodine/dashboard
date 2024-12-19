import Link from "next/link";
import {Building2, TableOfContents, Tag} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {CreateTagForm} from "@/components/tag/create-tag-form";
import themeService from "@/services/theme.service";

type TenantCreateTagPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantCreateTagPage({params}: TenantCreateTagPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: colors}] = await Promise.all([
    tenantService.getById(tenantId),
    themeService.getAllColors(),
  ]);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Add tag"} />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Tag,
            title: "Tags",
            href: `/d/${tenantId}/tags`,
          },
          {
            icon: TableOfContents,
            title: "Add tag",
          },
        ]}
      />

      <section className="container">
        <CreateTagForm colors={colors} tenant={tenant} />
      </section>
    </>
  );
}
