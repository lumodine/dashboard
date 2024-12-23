import {Building2, Plus, Tags} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import tagService from "@/services/tag.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import {ItemList} from "@/components/item/item-list";
import {Button} from "@/components/ui/button";

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
            icon: Tags,
            title: "Tags",
          },
        ]}
      />

      <section className="container">
        <div className="inline-flex gap-2 justify-start items-center mb-3">
          <Link href={`/d/${tenant._id}/tags/create`}>
            <Button size={"sm"}>
              <Plus size={14} /> New tag
            </Button>
          </Link>
        </div>

        <TenantIframeGroup>
          <ItemList isDragDisabled={true} isDropDisabled={true} items={tags} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
