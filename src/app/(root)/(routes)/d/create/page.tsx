import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { CreateTenantForm } from "@/components/app/create-tenant-form";
import { Hero } from "@/components/app/hero";
import currencyService from "@/services/currency.service";
import languageService from "@/services/language.service";

export default async function DashboardPage() {
    const [
        { data: languages },
        { data: currencies },
    ] = await Promise.all([
        languageService.getAll(),
        currencyService.getAll(),
    ]);

    return (
        <>
            <Hero
                supTitle={process.env.NEXT_PUBLIC_APP_NAME!}
                title={"İşletme ekle"}
                description={"Lorem ipsum dolor sit amet."}
                image={"https://placehold.co/500x300/png"}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: "İşletme ekle",
                    },
                ]}
            />

            <CreateTenantForm
                languages={languages}
                currencies={currencies}
            />
        </>
    );
}
