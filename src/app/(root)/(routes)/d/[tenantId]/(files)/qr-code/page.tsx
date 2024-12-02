import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { Button } from "@/components/ui/button";
import tenantService from "@/services/tenant.service";
import { Building2, Download, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TenantQrCodePageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantQrCodePage({
    params
}: TenantQrCodePageProps) {
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
                title={"Karekod"}
                description={"Baskı için kullanabileceğiniz karekodunuzu aşağıdan indirebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: QrCode,
                        title: "Karekod",
                    }
                ]}
            />

            <section className="container">
                <div className="w-52">
                    <Image
                        src={tenant.qrCode}
                        width={2048}
                        height={2048}
                        alt={`${tenant.name} karekod`}
                    />
                    <a
                        href={tenant.qrCode}
                        download={`${tenant.name} qr.png`}
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
            </section>
        </>
    );
}
