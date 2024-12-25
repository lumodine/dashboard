"use client";

import {Save} from "lucide-react";
import {SubmitButton} from "../common/submit-button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateAllAmounts from "@/actions/content/updateAllAmounts";

type UpdateAllAmountsFormGroupProps = {
  type: string;
  order: number;
  tenant: any;
  item: any;
};

const UpdateAllAmountsFormGroup = ({type, order, tenant, item}: UpdateAllAmountsFormGroupProps) => {
  return (
    <div className="border rounded-sm p-4 mt-4 flex flex-col gap-2">
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
                  name={`${type}[${order}][item][${item._id}][currency][${currency.currency._id}][amount]`}
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

type UpdateAllAmountsFormProps = {
  tenant: any;
  content: any;
};

const UpdateAllAmountsForm = ({tenant, content}: UpdateAllAmountsFormProps) => {
  const clientAction = async (formData: FormData) => {
    await updateAllAmounts(tenant._id, formData);
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products ({content.products.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          {content.products.map((product: any, productIndex: number) => {
            return (
              <UpdateAllAmountsFormGroup
                key={productIndex}
                item={product}
                order={productIndex + 1}
                tenant={tenant}
                type={"products"}
              />
            );
          })}
        </TabsContent>
      </Tabs>

      <SubmitButton className="w-full sticky left-0 bottom-5 my-5">
        <Save /> Save
      </SubmitButton>
    </form>
  );
};

UpdateAllAmountsForm.displayName = "UpdateAllAmountsForm";

export {UpdateAllAmountsForm};
