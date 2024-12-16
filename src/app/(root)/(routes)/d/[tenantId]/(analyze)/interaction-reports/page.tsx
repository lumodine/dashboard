import {Building2, ChartBar} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";

type TenantInteractionReportsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantInteractionReportsPage({
  params,
}: TenantInteractionReportsPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Interaction reports"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: ChartBar,
            title: "Interaction reports",
          },
        ]}
      />

      <section className="container">TenantInteractionReportsPage</section>
    </>
  );
}
