import {Building2, Contact} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {UpdateTenantSocialMediaForm} from "@/components/tenant/update-tenant-social-media-form";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantSocialMediaPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantSocialMediaPage({params}: TenantSocialMediaPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        description={"Strengthen your digital presence by connecting your social media accounts."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Social media"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Contact,
            title: "Social media",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UpdateTenantSocialMediaForm tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
