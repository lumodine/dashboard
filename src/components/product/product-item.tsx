"use client";

import {Camera, ChevronsUpDown, Eye, EyeOff, Ghost, Trash} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Draggable} from "@hello-pangea/dnd";
import {toast} from "react-toastify";
import {ChangeEvent} from "react";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {PRODUCT_TYPES} from "@/constants/product";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/shadcn";
import uploadProductImage from "@/actions/product/uploadProductImage";
import removeProductImage from "@/actions/product/removeProductImage";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateItemStatus from "@/actions/item/updateItemStatus";
import updateItemType from "@/actions/item/updateItemType";
import {ITEM_KINDS} from "@/constants/item";

export type ProductItemProps = {
  tenant: any;
  product: any;
  index: number;
  isDragDisabled?: boolean;
};

export const ProductItem = ({tenant, product, index, isDragDisabled}: ProductItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const category = product.parentItems.find(
    (parentItem: any) =>
      parentItem.kind === ITEM_KINDS.CATEGORY || parentItem.kind === ITEM_KINDS.TAG,
  );

  if (!category) {
    return null;
  }

  const handleType = async (type: string) => {
    const response = await updateItemType(tenant._id, product._id, type);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    if (response.success) {
      reloadIframe();
    }
  };

  const handleStatus = async (status: string) => {
    const response = await updateItemStatus(tenant._id, product._id, status);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    if (response.success) {
      reloadIframe();
    }
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

    if (response.success) {
      reloadIframe();
    }
  };

  const handleRemoveImage = async () => {
    const response = await removeProductImage(tenant._id, product._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    if (response.success) {
      reloadIframe();
    }
  };

  return (
    <Draggable
      key={product._id}
      draggableId={product._id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border rounded-lg overflow-hidden hover:bg-gray-50"
        >
          <div className="flex gap-2 p-2 items-center">
            {!isDragDisabled && (
              <div {...provided.dragHandleProps}>
                <ChevronsUpDown strokeWidth={1} />
              </div>
            )}

            <div>
              <Label
                className="text-center"
                htmlFor={`image-${tenant._id}-${category._id}-${product._id}`}
              >
                <div className="relative flex items-center justify-center border rounded-lg w-[60px] h-[60px] cursor-pointer group">
                  {product.image && (
                    <Image
                      alt={product.translations[0].title}
                      height={60}
                      loading="lazy"
                      src={product.image}
                      width={60}
                    />
                  )}
                  <span
                    className={cn(
                      "absolute top-0 left-0 h-full w-full items-center justify-center text-xs bg-black/50 text-white",
                      product.image && "hidden group-hover:flex",
                      !product.image && "flex",
                    )}
                  >
                    <Camera size={24} />
                  </span>
                  {product.image && (
                    <Button
                      className="absolute -top-1 -right-1 z-20 h-6 w-6"
                      size={"icon"}
                      variant={"destructive"}
                      onClick={handleRemoveImage}
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              </Label>
              <Input
                accept="image/*"
                className="hidden"
                id={`image-${tenant._id}-${category._id}-${product._id}`}
                name={`image-${tenant._id}-${category._id}-${product._id}`}
                type="file"
                onChange={handleUploadImage}
              />
            </div>
            <Link
              className="w-full flex flex-col gap-1 items-start"
              href={`/d/${tenant._id}/menu/${category._id}/${product._id}`}
            >
              <b>{product.translations[0].title}</b>
            </Link>
            <div className="flex flex-col items-center gap-1">
              <Select defaultValue={product.type} onValueChange={(value) => handleType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_TYPES.map((productType: any, productTypeIndex: number) => (
                    <SelectItem key={productTypeIndex} value={productType.key}>
                      {productType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button
                size={"icon"}
                variant={product.status === "not_available" ? "default" : "ghost"}
                onClick={() =>
                  handleStatus(product.status === "not_available" ? "published" : "not_available")
                }
              >
                <Ghost />
              </Button>
            </div>
            <div className="flex flex-col items-center gap-1">
              {product.status === "published" && (
                <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("hidden")}>
                  <Eye />
                </Button>
              )}
              {product.status === "hidden" && (
                <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("published")}>
                  <EyeOff />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
ProductItem.displayName = "ProductItem";
