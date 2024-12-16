"use client";

import {toast} from "react-toastify";
import {Plus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import createProduct from "@/actions/product/createProduct";
import {SubmitButton} from "@/components/common/submit-button";

export type CreateProductFormProps = {
  tenant: any;
  category: any;
};

export const CreateProductForm = ({tenant, category}: CreateProductFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await createProduct(tenant._id, category._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      {tenant.languages.map((language: any, languageIndex: number) => (
        <Input
          key={languageIndex}
          defaultValue={language.language._id}
          name="languages"
          type="hidden"
        />
      ))}
      {tenant.currencies.map((currency: any, currencyIndex: number) => (
        <Input
          key={currencyIndex}
          defaultValue={currency.currency._id}
          name="currencies"
          type="hidden"
        />
      ))}

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Name (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor="names">
                {language.language.name} - {language.language.shortName} (*)
              </Label>
              <Input required id="names" name="names" type="text" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Description</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor="descriptions">
                {language.language.name} - {language.language.shortName}
              </Label>
              <Input id="descriptions" name="descriptions" type="text" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Price</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.currencies.map((currency: any, currencyIndex: number) => (
            <div key={currencyIndex}>
              <Label htmlFor="amounts">
                {currency.currency.code} - {currency.currency.symbol}
              </Label>
              <Input id="amounts" name="amounts" step={0.01} type="number" />
            </div>
          ))}
        </div>
      </div>

      <span className="text-xs">(*) Required field</span>
      <SubmitButton>
        <Plus /> Create product
      </SubmitButton>
    </form>
  );
};
CreateProductForm.displayName = "CreateProductForm";
