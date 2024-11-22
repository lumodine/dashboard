import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { TenantIframe } from "@/components/app/tenant";
import { UpdateTenantLanguageSettingsForm } from "@/components/app/update-tenant-language-settings-form";
import languageService from "@/services/language.service";
import tenantService from "@/services/tenant.service";

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

            <section className="container flex flex-col lg:flex-row gap-4">
                <UpdateTenantLanguageSettingsForm
                    languages={languages}
                    tenant={tenant}
                />
                <TenantIframe
                    tenant={tenant}
                />
            </section>
        </>
    );
}
