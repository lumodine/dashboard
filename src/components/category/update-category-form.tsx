"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import updateCategory from "@/actions/category/updateCategory";
import {formatDate} from "@/utils/date";
import { useIframeReloadContext } from "@/contexts/iframeReloadContext";

export type UpdateCategoryFormProps = {
  tenant: any;
  category: any;
};

export const UpdateCategoryForm = ({tenant, category}: UpdateCategoryFormProps) => {
  const {reloadIframe} = useIframeReloadContext();
  
  const clientAction = async (formData: FormData) => {
    const response = await updateCategory(tenant._id, category._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
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

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Ad (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = category.translations.find(
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
            const item = category.translations.find(
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

      <span className="text-xs">(*) Zorunlu alan</span>

      <div className="flex flex-col sm:flex-row justify-between gap-1">
        <span className="text-muted-foreground text-xs">
          <b>Oluşturma tarihi</b>: {formatDate(category.createdAt)}
        </span>
        <span className="text-muted-foreground text-xs">
          <b>Güncelleme tarihi</b>: {formatDate(category.updatedAt)}
        </span>
      </div>

      <Button className="w-full" type="submit">
        <Save /> Kaydet
      </Button>
    </form>
  );
};
UpdateCategoryForm.displayName = "UpdateCategoryForm";
