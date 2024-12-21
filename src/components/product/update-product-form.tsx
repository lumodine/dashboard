"use client";

import {toast} from "react-toastify";
import {Camera, Plus, Save, Trash} from "lucide-react";
import {ChangeEvent, useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {NotFound} from "@/components/common/error";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateProduct from "@/actions/product/updateProduct";
import {formatDate} from "@/utils/date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import uploadProductImage from "@/actions/product/uploadProductImage";
import removeProductImage from "@/actions/product/removeProductImage";
import {cn} from "@/utils/shadcn";

export type UpdateProductFormProps = {
  tenant: any;
  categories: any[];
  category: any;
  product: any;
  tags: any[];
};

export const UpdateProductForm = ({
  tenant,
  categories,
  category,
  product,
  tags,
}: UpdateProductFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const _productTags = tags.filter((tag) =>
    product.parentItems.some((productTag: any) => productTag.item._id === tag._id),
  );

  const _addableTags = tags.filter(
    (tag) => !_productTags.some((productTag: any) => productTag._id === tag._id),
  );

  const [otherTags, setOtherTags] = useState<any[]>(_productTags);

  const [addableTags, setAddableTags] = useState<any[]>(_addableTags);
  const [newTagId, setNewTagId] = useState<string>();

  const removeTag = (tag: any) => {
    let tempOtherTags = [...otherTags];

    tempOtherTags = tempOtherTags.filter((tempOtherTag) => tempOtherTag._id !== tag._id);

    setOtherTags(tempOtherTags);

    let tempAddableTags = [...addableTags];

    tempAddableTags.push(tag);

    setAddableTags(tempAddableTags);

    setNewTagId("");
  };

  const addNewTag = () => {
    if (!newTagId) {
      return;
    }

    const tag = addableTags.find((addableTag) => addableTag._id === newTagId);

    let tempAddableTags = [...addableTags];

    tempAddableTags = tempAddableTags.filter((tempAddableTag) => tempAddableTag._id !== tag._id);

    setAddableTags(tempAddableTags);

    let tempOtherTags = [...otherTags];

    tempOtherTags.push(tag);

    setOtherTags(tempOtherTags);

    setNewTagId("");
  };

  const clientAction = async (formData: FormData) => {
    const response = await updateProduct(tenant._id, category._id, product._id, formData);

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

    const response = await uploadProductImage(tenant._id, category._id, product._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const handleRemoveImage = async () => {
    const response = await removeProductImage(tenant._id, category._id, product._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const selectedCategory = categories.find((category: any) =>
    product.parentItems.find((item: any) => item.item._id === category._id),
  );

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

      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="relative w-[100px] h-[100px] cursor-pointer group">
          <Label
            className="text-center inline-block cursor-pointer"
            htmlFor={`image-${tenant._id}-${category._id}-${product._id}`}
          >
            {product.image && (
              <Image
                alt={product.translations[0].name}
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
          id={`image-${tenant._id}-${category._id}-${product._id}`}
          name={`image-${tenant._id}-${category._id}-${product._id}`}
          type="file"
          onChange={handleUploadImage}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Category (*)</Label>
        </div>
        <Select defaultValue={selectedCategory._id} name="category">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: any, categoryIndex: number) => (
              <SelectItem key={categoryIndex} value={category._id}>
                {category.translations[0].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Name (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = product.translations.find(
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
            const item = product.prices.find(
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
                  step={0.01}
                  type="number"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Tags</Label>
        </div>
        <div className="flex flex-col gap-2">
          {otherTags.length === 0 && <NotFound title="You have not added any tags. Add one now." />}

          {addableTags.length > 0 && (
            <div className="flex items-center gap-2">
              <Button type="button" onClick={addNewTag}>
                <Plus size={14} />
              </Button>
              <Select onValueChange={(value) => setNewTagId(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {addableTags.map((tag: any, tagIndex: number) => (
                    <SelectItem key={tagIndex} value={tag._id}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full bg-primary w-3 h-3 theme-${tag.theme?.color}`}
                        />
                        <span>{tag.translations[0].name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {otherTags.map((tag: any, tagIndex: number) => (
            <div
              key={tagIndex}
              className="flex justify-between items-center gap-3 p-2 border rounded-lg"
            >
              <Input defaultValue={tag._id} name="tags" type="hidden" />
              <div className="flex gap-2 items-center">
                <div className={`rounded-full bg-primary w-3 h-3 theme-${tag.theme?.color}`} />
                <span>{tag.translations[0].name}</span>
              </div>
              <Button type="button" variant={"destructive"} onClick={() => removeTag(tag)}>
                <Trash size={14} />
              </Button>
            </div>
          ))}
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
