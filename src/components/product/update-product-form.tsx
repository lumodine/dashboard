"use client";

import {toast} from "react-toastify";
import {Camera, Save, Trash} from "lucide-react";
import {ChangeEvent} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateProduct from "@/actions/product/updateProduct";
import {formatDate} from "@/utils/date";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import uploadProductImage from "@/actions/product/uploadProductImage";
import removeProductImage from "@/actions/product/removeProductImage";
import {cn} from "@/utils/shadcn";

export type UpdateProductFormProps = {
  tenant: any;
  product: any;
};

export const UpdateProductForm = ({tenant, product}: UpdateProductFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const clientAction = async (formData: FormData) => {
    const response = await updateProduct(
      tenant._id,
      tenant.languages,
      tenant.currencies,
      product._id,
      formData,
    );

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

    const response = await uploadProductImage(tenant._id, product._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const handleRemoveImage = async () => {
    const response = await removeProductImage(tenant._id, product._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="relative w-[100px] h-[100px] cursor-pointer group">
          <Label
            className="text-center inline-block cursor-pointer"
            htmlFor={`image-${tenant._id}-${product._id}`}
          >
            {product.image && (
              <Image
                alt={product.translations[0].title}
                height={100}
                loading="lazy"
                src={product.image}
                width={100}
              />
            )}
            <span
              className={cn(
                "absolute top-0 left-0 h-full w-full items-center justify-center text-xs bg-black/50 text-white",
                product.image && "hidden group-hover:flex",
                !product.image && "flex",
              )}
            >
              <Camera size={36} />
            </span>
          </Label>
        </div>
        {product.image && (
          <Button size={"sm"} type="button" variant={"destructive"} onClick={handleRemoveImage}>
            <Trash /> Remove image
          </Button>
        )}
        <Input
          accept="image/*"
          className="hidden"
          id={`image-${tenant._id}-${product._id}`}
          name={`image-${tenant._id}-${product._id}`}
          type="file"
          onChange={handleUploadImage}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Title (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = product.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`titles-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName} (*)
                </Label>
                <Input
                  required
                  defaultValue={item?.title}
                  id={`titles-${language.language._id}`}
                  name="titles"
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
            const item = product.translations.find(
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

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Price</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.currencies.map((currency: any, currencyIndex: number) => {
            const item = product?.prices?.find(
              (price: any) => price.currency._id === currency.currency._id,
            );

            return (
              <div key={currencyIndex}>
                <Label htmlFor={`amounts-${currency.currency._id}`}>
                  {currency.currency.code} - {currency.currency.symbol}
                </Label>
                <Input
                  defaultValue={item?.amount}
                  id={`amounts-${currency.currency._id}`}
                  name="amounts"
                  step={0.00000000000000000000000000000001}
                  type="number"
                />
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-xs">(*) Required field</span>

      <div className="flex flex-col sm:flex-row justify-between gap-1">
        <span className="text-muted-foreground text-xs">
          <b>Creation date</b>: {formatDate(product.createdAt)}
        </span>
        <span className="text-muted-foreground text-xs">
          <b>Update date</b>: {formatDate(product.updatedAt)}
        </span>
      </div>

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateProductForm.displayName = "UpdateProductForm";
