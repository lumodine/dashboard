import {Building2, Megaphone} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";

type TenantAnnouncementsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantAnnouncementsPage({params}: TenantAnnouncementsPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Duyurular"} />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Megaphone,
            title: "Duyurular",
          },
        ]}
      />

      <section className="container">TenantAnnouncementsPage</section>
    </>
  );
}
