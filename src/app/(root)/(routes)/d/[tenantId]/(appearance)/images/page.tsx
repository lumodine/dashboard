import {Building2, FileImage} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {UploadTenantImagesForm} from "@/components/tenant/upload-tenant-images-form";
import tenantService from "@/services/tenant.service";
import {TenantIframeGroup} from "@/components/tenant/tenant-iframe-group";
import {TenantIframe} from "@/components/tenant/tenant-iframe";

type TenantImagesPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantImagesPage({params}: TenantImagesPageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        description={"Add your custom logo and background to reflect your brand."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Logo and background"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: FileImage,
            title: "Logo and background",
          },
        ]}
      />

      <section className="container">
        <TenantIframeGroup>
          <UploadTenantImagesForm tenant={tenant} />
          <TenantIframe tenant={tenant} />
        </TenantIframeGroup>
      </section>
    </>
  );
}
