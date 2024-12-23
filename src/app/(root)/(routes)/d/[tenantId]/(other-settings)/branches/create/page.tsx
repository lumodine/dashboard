import {Building2, MapPinHouse, MapPinPlus} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {CreateTenantBranchForm} from "@/components/tenantBranch/create-tenant-branch-form";

type TenantBranchCreatePageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantBranchCreatePage({params}: TenantBranchCreatePageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Create branch"}
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
            icon: MapPinPlus,
            title: "Create branch",
          },
        ]}
      />

      <section className="container">
        <CreateTenantBranchForm tenant={tenant} />
      </section>
    </>
  );
}
