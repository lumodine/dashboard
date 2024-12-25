import Link from "next/link";
import {notFound} from "next/navigation";
import {Building2, Megaphone, Plus} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import announcementService from "@/services/announcement.service";
import {UpdateAnnouncementForm} from "@/components/announcement/update-announcement-form";
import {RemoveAnnouncementForm} from "@/components/announcement/remove-announcement-form";

type TenantAnnouncementDetailPageProps = {
  params: Promise<{
    tenantId: string;
    announcementId: string;
  }>;
};

export default async function TenantAnnouncementDetailPage({
  params,
}: TenantAnnouncementDetailPageProps) {
  const {tenantId, announcementId} = await params;

  const [{data: tenant}, {data: announcement}] = await Promise.all([
    tenantService.getById(tenantId),
    announcementService.getById(tenantId, announcementId),
  ]);

  if (!announcement) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={announcement.translations[0].title}
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
            title: announcement.translations[0].title,
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full flex flex-col gap-4">
            <UpdateAnnouncementForm announcement={announcement} tenant={tenant} />
            <RemoveAnnouncementForm announcement={announcement} tenant={tenant} />
          </div>
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
