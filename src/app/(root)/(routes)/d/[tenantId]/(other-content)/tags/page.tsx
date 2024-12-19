import {Building2, Tag} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import tagService from "@/services/tag.service";
import {TagList} from "@/components/tag/tag-list";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantTagsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantTagsPage({params}: TenantTagsPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: tags}] = await Promise.all([
    tenantService.getById(tenantId),
    tagService.getAll(tenantId),
  ]);

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

      <section className="container">
        <TenantIframeGroup>
          <TagList tags={tags} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
