import {Building2, ChartBar} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantEventChart} from "@/components/tenant/tenant-event-chart";
import eventService from "@/services/event.service";

type TenantInteractionReportsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantInteractionReportsPage({
  params,
}: TenantInteractionReportsPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: events}] = await Promise.all([
    tenantService.getById(tenantId),
    eventService.getAllGrouped(tenantId),
  ]);

  return (
    <>
      <Hero
        description={"Track user behavior and examine your activity data."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Events"}
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
            title: "Events",
          },
        ]}
      />

      <section className="container">
        <TenantEventChart chartData={events} />
      </section>
    </>
  );
}
