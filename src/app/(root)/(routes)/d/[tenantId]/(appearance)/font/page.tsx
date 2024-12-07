import {Building2, CaseSensitive} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";

type TenantFontPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantFontPage({params}: TenantFontPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Yazı tipi"} />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: CaseSensitive,
            title: "Yazı tipi",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full">TenantFontPage</div>
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
