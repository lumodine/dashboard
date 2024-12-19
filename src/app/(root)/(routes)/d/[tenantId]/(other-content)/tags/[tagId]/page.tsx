import Link from "next/link";
import {notFound} from "next/navigation";
import {Building2, TableOfContents, Tags} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {UpdateTagForm} from "@/components/tag/update-tag-form";
import {RemoveTagForm} from "@/components/tag/remove-tag-form";
import tagService from "@/services/tag.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import themeService from "@/services/theme.service";

type TenantTagDetailPageProps = {
  params: Promise<{
    tenantId: string;
    tagId: string;
  }>;
};

export default async function TenantTagDetailPage({params}: TenantTagDetailPageProps) {
  const {tenantId, tagId} = await params;

  const [{data: tenant}, {data: tag}, {data: colors}] = await Promise.all([
    tenantService.getById(tenantId),
    tagService.getById(tenantId, tagId),
    themeService.getAllColors(),
  ]);

  if (!tag) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={tag.translations[0].name}
      />

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
            href: `/d/${tenantId}/tags`,
          },
          {
            icon: TableOfContents,
            title: tag.translations[0].name,
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full flex flex-col gap-4">
            <UpdateTagForm colors={colors} tag={tag} tenant={tenant} />
            <RemoveTagForm tag={tag} tenant={tenant} />
          </div>
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
