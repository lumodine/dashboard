import Link from "next/link";
import {notFound} from "next/navigation";
import {Building2, MapPin, MapPinHouse} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import tenantBranchService from "@/services/tenantBranch.service";
import {UpdateTenantBranchForm} from "@/components/tenantBranch/update-tenant-branch-form";
import {RemoveTenantBranchForm} from "@/components/tenantBranch/remove-tenant-branch-form";

type TenantBranchDetailPageProps = {
  params: Promise<{
    tenantId: string;
    tenantBranchId: string;
  }>;
};

export default async function TenantBranchDetailPage({params}: TenantBranchDetailPageProps) {
  const {tenantId, tenantBranchId} = await params;

  const [{data: tenant}, {data: tenantBranch}] = await Promise.all([
    tenantService.getById(tenantId),
    tenantBranchService.getById(tenantId, tenantBranchId),
  ]);

  if (!tenantBranch) {
    return notFound();
  }

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={tenantBranch.translations[0].name}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: MapPinHouse,
            title: "Branches",
            href: `/d/${tenantId}/branches`,
          },
          {
            icon: MapPin,
            title: tenantBranch.translations[0].title,
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <div className="w-full flex flex-col gap-4">
            <UpdateTenantBranchForm tenant={tenant} tenantBranch={tenantBranch} />
            <RemoveTenantBranchForm tenant={tenant} tenantBranch={tenantBranch} />
          </div>
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
