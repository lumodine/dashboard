"use client";

import {Save} from "lucide-react";
import {toast} from "react-toastify";
import {SubmitButton} from "@/components/common/submit-button";
import {NotFound} from "@/components/common/error";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateAllAmounts from "@/actions/content/updateAllAmounts";

type UpdateAllAmountsFormGroupProps = {
  type: string;
  tenant: any;
  item: any;
};

const UpdateAllAmountsFormGroup = ({type, tenant, item}: UpdateAllAmountsFormGroupProps) => {
  return (
    <div className="border rounded-sm p-4 mt-4 flex flex-col gap-2">
      <Input defaultValue={item._id} name={`${type}_items`} type="hidden" />

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
                  name={`${type}[${item._id}][${currency.currency._id}][amount]`}
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

const tabs = [
  {
    title: "Products",
    type: "products",
  },
];

const UpdateAllAmountsForm = ({tenant, content}: UpdateAllAmountsFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await updateAllAmounts(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      {tenant.currencies.map((currency: any, currencyIndex: number) => (
        <Input
          key={currencyIndex}
          required
          defaultValue={currency.currency._id}
          name="currencies"
          type="hidden"
        />
      ))}

      <Tabs defaultValue={tabs[0].type}>
        <TabsList>
          {tabs.map((tab: any, tabIndex: number) => (
            <TabsTrigger key={tabIndex} value={tab.type}>
              {tab.title} ({content[tab.type]?.length || 0})
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab: any, tabIndex: number) => {
          const hasItems = content[tab.type]?.length > 0;

          return (
            <TabsContent key={tabIndex} value={tab.type}>
              {!hasItems && <NotFound title={"Items not found."} />}
              {hasItems && (
                <>
                  <Input required defaultValue={tab.type} name="type" type="hidden" />
                  {content[tab.type].map((item: any, itemIndex: number) => {
                    return (
                      <UpdateAllAmountsFormGroup
                        key={`${tab.type}-${itemIndex}`}
                        item={item}
                        tenant={tenant}
                        type={tab.type}
                      />
                    );
                  })}

                  <SubmitButton className="w-full sticky left-0 bottom-5 my-5">
                    <Save /> Save
                  </SubmitButton>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </form>
  );
};

UpdateAllAmountsForm.displayName = "UpdateAllAmountsForm";

export {UpdateAllAmountsForm};
