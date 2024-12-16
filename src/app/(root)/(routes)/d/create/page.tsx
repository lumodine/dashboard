import Link from "next/link";
import {Building2} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {CreateTenantForm} from "@/components/tenant/create-tenant-form";
import {Hero} from "@/components/common/hero";
import currencyService from "@/services/currency.service";
import languageService from "@/services/language.service";

export default async function DashboardPage() {
  const [{data: languages}, {data: currencies}] = await Promise.all([
    languageService.getAll(),
    currencyService.getAll(),
  ]);

  return (
    <>
      <Hero
        supTitle={<Link href={"/d"}>{process.env.NEXT_PUBLIC_APP_NAME!}</Link>}
        title={"Add tenant"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: "Add tenant",
          },
        ]}
      />

      <section className="container">
        <CreateTenantForm currencies={currencies} languages={languages} />
      </section>
    </>
  );
}
