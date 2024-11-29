import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { UploadTenantImagesForm } from "@/components/tenant/upload-tenant-images-form";
import tenantService from "@/services/tenant.service";
import { Building2, FileImage } from "lucide-react";
import Link from "next/link";

type TenantImagesPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantImagesPage({
    params,
}: TenantImagesPageProps) {
    const { tenantId } = await params;
    const { data: tenant } = await tenantService.getById(tenantId);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Logo ve arkaplan"}
                description={"İşletmenize ait logo ve arkaplan görselini buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: FileImage,
                        title: "Logo ve arkaplan",
                    }
                ]}
            />

            <section className="container">
                <UploadTenantImagesForm
                    tenant={tenant}
                />
            </section>
        </>
    );
}
