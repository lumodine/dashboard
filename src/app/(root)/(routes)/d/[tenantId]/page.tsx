import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { TenantMenuList } from "@/components/tenant/tenant-menu-list";
import { Button } from "@/components/ui/button";
import tenantService from "@/services/tenant.service";
import { Building2, ExternalLink } from "lucide-react";
import Link from "next/link";

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
            <Hero
                supTitle={
                    <Link href={"/d"}>
                        {process.env.NEXT_PUBLIC_APP_NAME!}
                    </Link>
                }
                title={tenant.name}
                button={
                    <Link
                        href={process.env.NEXT_PUBLIC_QR_MENU_URL!.replace("{alias}", tenant.alias)}
                        target="_blank"
                    >
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                        >
                            <ExternalLink /> Menüyü gör
                        </Button>
                    </Link>
                }
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                    }
                ]}
            />

            <section className="container">
                <TenantMenuList
                    tenant={tenant}
                />
            </section>
        </>
    );
}
