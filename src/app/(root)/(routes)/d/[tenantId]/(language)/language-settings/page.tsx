import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { Hero } from "@/components/common/hero";
import { UpdateTenantLanguageSettingsForm } from "@/components/tenant/update-tenant-language-settings-form";
import languageService from "@/services/language.service";
import tenantService from "@/services/tenant.service";
import Link from "next/link";

type TenantLanguageSettingsPageProps = {
    params: Promise<{
        tenantId: string,
    }>;
};

export default async function TenantLanguageSettingsPage({
    params,
}: TenantLanguageSettingsPageProps) {
    const { tenantId } = await params;
    const [
        { data: languages },
        { data: tenant },
    ] = await Promise.all([
        languageService.getAll(),
        tenantService.getById(tenantId),
    ]);

    return (
        <>
            <Hero
                supTitle={
                    <Link href={`/d/${tenant._id}`}>
                        {tenant.name}
                    </Link>
                }
                title={"Dil ayarları"}
                description={"İşletmenize ait dil ayarlarını buradan güncelleyebilirsiniz."}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: tenant.name,
                        href: `/d/${tenantId}`
                    },
                    {
                        title: "Dil ayarları",
                    }
                ]}
            />

            <section className="container">
                <UpdateTenantLanguageSettingsForm
                    languages={languages}
                    tenant={tenant}
                />
            </section>
        </>
    );
}
