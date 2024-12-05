import {Building2, MapPinHouse} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";

type TenantAddressPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantAddressPage({params}: TenantAddressPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Adres"} />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: MapPinHouse,
            title: "Adres",
          },
        ]}
      />

      <section className="container">TenantAddressPage</section>
    </>
  );
}
