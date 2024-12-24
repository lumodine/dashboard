import {Building2, Download, QrCode} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import {Button} from "@/components/ui/button";
import tenantService from "@/services/tenant.service";

type TenantQrCodePageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantQrCodePage({params}: TenantQrCodePageProps) {
  const {tenantId} = await params;
  const {data: tenant} = await tenantService.getById(tenantId);

  return (
    <>
      <Hero
        description={"Create your QR codes and digitize your menus."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"QR Code"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: QrCode,
            title: "QR Code",
          },
        ]}
      />

      <section className="container">
        <div className="w-52">
          <Image alt={`${tenant.name} qr code`} height={2048} src={tenant.qrCode} width={2048} />
          <a download={`${tenant.name} qr.png`} href={tenant.qrCode}>
            <Button size={"sm"} variant={"outline"}>
              <Download />
              Download QR Code
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
