import {Building2, Megaphone, Plus} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import {Button} from "@/components/ui/button";
import announcementService from "@/services/announcement.service";
import {AnnouncementList} from "@/components/announcement/announcement-list";

type TenantAnnouncementsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantAnnouncementsPage({params}: TenantAnnouncementsPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: announcements}] = await Promise.all([
    tenantService.getById(tenantId),
    announcementService.getAll(tenantId),
  ]);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Announcements"}
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
          },
        ]}
      />

      <section className="container">
        <div className="inline-flex gap-2 justify-start items-center mb-3">
          <Link href={`/d/${tenant._id}/announcements/create`}>
            <Button size={"sm"}>
              <Plus size={14} /> New announcement
            </Button>
          </Link>
        </div>

        <TenantIframeGroup>
          <AnnouncementList announcements={announcements} tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
