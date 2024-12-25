import Link from "next/link";
import {Building2, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import contentService from "@/services/content.service";
import {TranslateAllContentsForm} from "@/components/content/translate-all-contents-form";

type TenantTranslateAllContentsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
  searchParams: Promise<{
    item: string;
  }>;
};

export default async function TenantTranslateAllContentsPage({
  params,
  searchParams,
}: TenantTranslateAllContentsPageProps) {
  const {tenantId} = await params;
  const {item} = await searchParams;

  const [{data: tenant}, {data: content}] = await Promise.all([
    tenantService.getById(tenantId),
    contentService.getAllTranslatableContents(tenantId, item),
  ]);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Translate all contents"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: TableOfContents,
            title: "Translate all contents",
          },
        ]}
      />

      <section className="container">
        <TranslateAllContentsForm content={content} tenant={tenant} />
      </section>
    </>
  );
}
