import Link from "next/link";
import {Building2, Landmark, Save} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import contentService from "@/services/content.service";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type FormGroupProps = {
  tenant: any;
  item: any;
};

const FormGroup = ({tenant, item}: FormGroupProps) => {
  return (
    <div className="border p-4 mt-4 flex flex-col gap-2">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Title</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const translation = item.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`titles-${item._id}-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName}
                </Label>
                <Input
                  disabled
                  required
                  defaultValue={translation?.title}
                  id={`titles-${item._id}-${language.language._id}`}
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Price</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.currencies.map((currency: any, currencyIndex: number) => {
            const price = item.prices.find(
              (price: any) => price.currency._id === currency.currency._id,
            );

            return (
              <div key={currencyIndex}>
                <Label htmlFor={`amounts-${item._id}-${currency.currency._id}`}>
                  {currency.currency.code} - {currency.currency.symbol}
                </Label>
                <Input
                  defaultValue={price?.amount}
                  id={`amounts-${item._id}-${currency.currency._id}`}
                  name="amounts"
                  step={0.00000000000000000000000000000001}
                  type="number"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type TenantUpdateAllAmountsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantUpdateAllAmountsPage({
  params,
}: TenantUpdateAllAmountsPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: content}] = await Promise.all([
    tenantService.getById(tenantId),
    contentService.getAllTranslatableCurrencies(tenantId),
  ]);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Update all amounts"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Landmark,
            title: "Update all amounts",
          },
        ]}
      />

      <section className="container">
        <form>
          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Products ({content.products.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              {content.products.map((product: any, productIndex: number) => {
                return <FormGroup key={productIndex} item={product} tenant={tenant} />;
              })}
            </TabsContent>
          </Tabs>

          <Button className="w-full sticky left-0 bottom-5 my-5">
            <Save /> Save
          </Button>
        </form>
      </section>
    </>
  );
}
