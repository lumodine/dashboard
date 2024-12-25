import Link from "next/link";
import {Building2, Landmark} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import contentService from "@/services/content.service";
import {UpdateAllAmountsForm} from "@/components/content/update-all-amounts-form";

type TenantUpdateAllAmountsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
  searchParams: Promise<{
    item: string;
  }>;
};

export default async function TenantUpdateAllAmountsPage({
  params,
  searchParams,
}: TenantUpdateAllAmountsPageProps) {
  const {tenantId} = await params;
  const {item} = await searchParams;

  const [{data: tenant}, {data: content}] = await Promise.all([
    tenantService.getById(tenantId),
    contentService.getAllTranslatableCurrencies(tenantId, item),
  ]);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Update all amounts"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Landmark,
            title: "Update all amounts",
          },
        ]}
      />

      <section className="container">
        <UpdateAllAmountsForm content={content} tenant={tenant} />
      </section>
    </>
  );
}
