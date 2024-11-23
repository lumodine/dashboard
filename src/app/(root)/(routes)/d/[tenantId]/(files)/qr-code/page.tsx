import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { Button } from "@/components/ui/button";
import tenantService from "@/services/tenant.service";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TenantQrCodePageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

const QR_CODE_SIZES = {
    small: {
        title: 'Küçük',
        width: 256,
        height: 256,
    },
    medium: {
        title: 'Orta',
        width: 512,
        height: 512,
    },
    large: {
        title: 'Büyük',
        width: 1024,
        height: 1024,
    },
    xlarge: {
        title: 'En büyük',
        width: 2048,
        height: 2048,
    },
}

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
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Karekod",
                    }
                ]}
            />

            <section className="container">
                <div className="flex flex-col gap-5">
                    {
                        Object.entries(tenant.qrCodes).map(([key, value]) => {
                            const qrSize = QR_CODE_SIZES[key];

                            return (
                                <div key={key}>
                                    <span className="font-semibold">
                                        {qrSize.width}x{qrSize.height}
                                    </span>
                                    <div className="relative">
                                        <Image
                                            src={value}
                                            width={qrSize.width}
                                            height={qrSize.height}
                                            alt={`${tenant.name} karekod`}
                                        />
                                        <a
                                            href={value}
                                            download={`${tenant.name} ${qrSize.title} karekod.png`}
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
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );
}
