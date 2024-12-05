"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import updateProduct from "@/actions/product/updateProduct";
import {formatDate} from "@/utils/date";

export type UpdateProductFormProps = {
  tenant: any;
  category: any;
  product: any;
};

export const UpdateProductForm = ({tenant, category, product}: UpdateProductFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await updateProduct(tenant._id, category._id, product._id, formData);

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
          <Label>Ad (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = product.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor="names">
                  {language.language.name} - {language.language.shortName} (*)
                </Label>
                <Input required defaultValue={item?.name} id="names" name="names" type="text" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Açıklama</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = product.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor="descriptions">
                  {language.language.name} - {language.language.shortName}
                </Label>
                <Input
                  defaultValue={item?.description}
                  id="descriptions"
                  name="descriptions"
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Fiyat</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.currencies.map((currency: any, currencyIndex: number) => {
            const item = product.prices.find(
              (price: any) => price.currency._id === currency.currency._id,
            );

            return (
              <div key={currencyIndex}>
                <Label htmlFor="amounts">
                  {currency.currency.code} - {currency.currency.symbol}
                </Label>
                <Input
                  defaultValue={item?.amount}
                  id="amounts"
                  name="amounts"
                  step={0.01}
                  type="number"
                />
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-xs">(*) Zorunlu alan</span>

      <div className="flex flex-col sm:flex-row justify-between gap-1">
        <span className="text-muted-foreground text-xs">
          <b>Oluşturma tarihi</b>: {formatDate(product.createdAt)}
        </span>
        <span className="text-muted-foreground text-xs">
          <b>Güncelleme tarihi</b>: {formatDate(product.updatedAt)}
        </span>
      </div>

      <Button className="w-full" type="submit">
        <Save /> Kaydet
      </Button>
    </form>
  );
};
UpdateProductForm.displayName = "UpdateProductForm";
