import {Building2, MapPinHouse, Plus} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";
import tenantBranchService from "@/services/tenantBranch.service";
import {Button} from "@/components/ui/button";
import {TenantBranchList} from "@/components/tenantBranch/tenant-branch-list";

type TenantBranchesPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantBranchesPage({params}: TenantBranchesPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: tenantBranches}] = await Promise.all([
    tenantService.getById(tenantId),
    tenantBranchService.getAll(tenantId),
  ]);

  return (
    <>
      <Hero
        description={"Manage and organize information for your multiple branches."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Branches"}
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
          },
        ]}
      />

      <section className="container">
        <div className="inline-flex gap-2 justify-start items-center mb-3">
          <Link href={`/d/${tenant._id}/branches/create`}>
            <Button size={"sm"}>
              <Plus size={14} /> New branch
            </Button>
          </Link>
        </div>

        <TenantIframeGroup>
          <TenantBranchList tenant={tenant} tenantBranches={tenantBranches} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
