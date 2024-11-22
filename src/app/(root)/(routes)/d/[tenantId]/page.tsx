import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { TenantIframe, TenantMenuList } from "@/components/app/tenant";
import { Button } from "@/components/ui/button";
import tenantService from "@/services/tenant.service";
import { Download } from "lucide-react";
import Image from "next/image";

type TenantPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantPage({ params }: TenantPageProps) {
    const { tenantId } = await params;
    const { data: tenant } = await tenantService.getById(tenantId);

    return (
        <>
            <section className="bg-primary py-8">
                <div className="container flex gap-6 items-center">
                    <div className="flex flex-col gap-2 items-center">
                        <Image
                            src={tenant.qrCodes.small}
                            width={128}
                            height={128}
                            alt={`${tenant.name} karekod`}
                        />
                        <a
                            href={tenant.qrCodes.small}
                            download={`${tenant.name} küçük karekod.png`}
                        >
                            <Button
                                variant={"outline"}
                                size={"sm"}
                            >
                                <Download />
                                Karekodu indir
                            </Button>
                        </a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-lg text-secondary">
                            {process.env.NEXT_PUBLIC_APP_NAME}
                        </span>
                        <h1 className="text-3xl font-semibold text-secondary">
                            {tenant.name}
                        </h1>
                        <p className="text-sm text-secondary">
                            {tenant.address}
                        </p>
                    </div>
                </div>
            </section>

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                    }
                ]}
            />

            <section className="container flex flex-col lg:flex-row gap-4">
                <TenantMenuList
                    tenant={tenant}
                />
                <TenantIframe
                    tenant={tenant}
                />
            </section>
        </>
    );
}
