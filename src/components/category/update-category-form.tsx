"use client";

import {toast} from "react-toastify";
import {Camera, Save, Trash} from "lucide-react";
import {ChangeEvent} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateCategory from "@/actions/category/updateCategory";
import {formatDate} from "@/utils/date";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import uploadCategoryImage from "@/actions/category/uploadCategoryImage";
import removeCategoryImage from "@/actions/category/removeCategoryImage";
import {cn} from "@/utils/shadcn";

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

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files?.length === 0) {
      return;
    }

    const imageFile = e.target.files[0];
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await uploadCategoryImage(tenant._id, category._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const handleRemoveImage = async () => {
    const response = await removeCategoryImage(tenant._id, category._id);

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

      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="relative w-[100px] h-[100px] cursor-pointer group">
          <Label
            className="text-center inline-block cursor-pointer"
            htmlFor={`image-${tenant._id}-${category._id}`}
          >
            {category.image && (
              <Image
                alt={category.translations[0].name}
                height={100}
                loading="lazy"
                src={category.image}
                width={100}
              />
            )}
            <span
              className={cn(
                "absolute top-0 left-0 h-full w-full items-center justify-center text-xs bg-black/50 text-white",
                category.image && "hidden group-hover:flex",
                !category.image && "flex",
              )}
            >
              <Camera size={36} />
            </span>
          </Label>
        </div>
        {category.image && (
          <Button size={"sm"} type="button" variant={"destructive"} onClick={handleRemoveImage}>
            <Trash /> Remove image
          </Button>
        )}
        <Input
          accept="image/*"
          className="hidden"
          id={`image-${tenant._id}-${category._id}`}
          name={`image-${tenant._id}-${category._id}`}
          type="file"
          onChange={handleUploadImage}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Name (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = category.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`names-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName} (*)
                </Label>
                <Input
                  required
                  defaultValue={item?.name}
                  id={`names-${language.language._id}`}
                  name="names"
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Description</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = category.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`descriptions-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName}
                </Label>
                <Input
                  defaultValue={item?.description}
                  id={`descriptions-${language.language._id}`}
                  name="descriptions"
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-xs">(*) Required field</span>

      <div className="flex flex-col sm:flex-row justify-between gap-1">
        <span className="text-muted-foreground text-xs">
          <b>Creation date</b>: {formatDate(category.createdAt)}
        </span>
        <span className="text-muted-foreground text-xs">
          <b>Update date</b>: {formatDate(category.updatedAt)}
        </span>
      </div>

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateCategoryForm.displayName = "UpdateCategoryForm";
