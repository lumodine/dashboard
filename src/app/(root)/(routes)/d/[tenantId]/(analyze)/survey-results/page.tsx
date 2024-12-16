import {Building2, FileUser} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";

type TenantSurveyResultsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantSurveyResultsPage({params}: TenantSurveyResultsPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Survey results"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: FileUser,
            title: "Survey results",
          },
        ]}
      />

      <section className="container">TenantSurveyResultsPage</section>
    </>
  );
}
