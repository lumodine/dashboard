import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Button } from "@/components/ui/button";
import tenantService from "@/services/tenant.service";
import { Download } from "lucide-react";
import Image from "next/image";

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
            <section className="bg-primary py-8">
                <div className="container flex gap-6 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold text-secondary">
                            Karekod
                        </h1>
                        <p className="text-sm text-secondary">
                            Baskı için kullanabileceğiniz karekodunuzu aşağıdan indirebilirsiniz.
                        </p>
                    </div>
                </div>
            </section>

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
