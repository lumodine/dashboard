import Link from "next/link";
import {Building2, Megaphone, Plus} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {CreateAnnouncementForm} from "@/components/announcement/create-announcement-form";

type TenantCreateAnnouncementPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantCreateAnnouncementPage({
  params,
}: TenantCreateAnnouncementPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Add announcement"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Megaphone,
            title: "Announcements",
            href: `/d/${tenantId}/announcements`,
          },
          {
            icon: Plus,
            title: "Add announcement",
          },
        ]}
      />

      <section className="container">
        <CreateAnnouncementForm tenant={tenant} />
      </section>
    </>
  );
}
