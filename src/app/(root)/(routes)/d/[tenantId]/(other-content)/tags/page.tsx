import {Building2, Tag} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";

type TenantTagsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantTagsPage({params}: TenantTagsPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Tags"} />

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
          },
        ]}
      />

      <section className="container">TenantTagsPage</section>
    </>
  );
}
