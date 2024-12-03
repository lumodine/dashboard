import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { CategoryList } from "@/components/category/category-list";
import categoryService from "@/services/category.service";
import tenantService from "@/services/tenant.service";
import Link from "next/link";
import { Building2, SquareMenu } from "lucide-react";

type TenantMenuPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantMenuPage({
    params,
}: TenantMenuPageProps) {
    const { tenantId } = await params;
    const [
        { data: tenant },
        { data: categories },
    ] = await Promise.all([
        tenantService.getById(tenantId),
        categoryService.getAll(tenantId),
    ]);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Menü"}
            />

            <AppBreadcrumb
                items={[
                    {
                        icon: Building2,
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        icon: SquareMenu,
                        title: "Menü",
                    }
                ]}
            />

            <section className="container">
                <CategoryList
                    tenant={tenant}
                    categories={categories}
                />
            </section>
        </>
    );
}
