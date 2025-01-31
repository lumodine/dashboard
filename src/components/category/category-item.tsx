"use client";

import {Camera, ChevronsUpDown, Eye, EyeOff, Trash} from "lucide-react";
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
import {ITEM_TYPES} from "@/constants/item";
import uploadCategoryImage from "@/actions/category/uploadCategoryImage";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/shadcn";
import removeCategoryImage from "@/actions/category/removeCategoryImage";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateItemStatus from "@/actions/item/updateItemStatus";
import updateItemType from "@/actions/item/updateItemType";

export type CategoryItemProps = {
  tenant: any;
  category: any;
  index: number;
  isDragDisabled?: boolean;
};

export const CategoryItem = ({tenant, category, index, isDragDisabled}: CategoryItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const handleStatus = async (status: string) => {
    const response = await updateItemStatus(tenant._id, category._id, status);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    if (response.success) {
      reloadIframe();
    }
  };

  const handleType = async (type: string) => {
    const response = await updateItemType(tenant._id, category._id, type);

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

    const response = await uploadCategoryImage(tenant._id, category._id, formData);

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
    const response = await removeCategoryImage(tenant._id, category._id);

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
      key={category._id}
      draggableId={category._id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border rounded-lg overflow-hidden hover:bg-gray-50"
        >
          <div className="flex gap-2 p-2 items-center justify-start w-full">
            {!isDragDisabled && (
              <div {...provided.dragHandleProps}>
                <ChevronsUpDown strokeWidth={1} />
              </div>
            )}
            <div>
              <Label className="text-center" htmlFor={`image-${tenant._id}-${category._id}`}>
                <div className="relative flex items-center justify-center border rounded-lg w-[60px] h-[60px] cursor-pointer group">
                  {category.image && (
                    <Image
                      alt={category.translations[0].title}
                      height={60}
                      loading="lazy"
                      src={category.image}
                      width={60}
                    />
                  )}
                  <span
                    className={cn(
                      "absolute top-0 left-0 h-full w-full items-center justify-center text-xs bg-black/50 text-white",
                      category.image && "hidden group-hover:flex",
                      !category.image && "flex",
                    )}
                  >
                    <Camera size={24} />
                  </span>
                  {category.image && (
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
                id={`image-${tenant._id}-${category._id}`}
                name={`image-${tenant._id}-${category._id}`}
                type="file"
                onChange={handleUploadImage}
              />
            </div>
            <Link
              className="flex-1 w-full flex flex-col gap-1 items-start"
              href={`/d/${tenant._id}/menu/${category._id}`}
            >
              <b>{category.translations[0].title}</b>
            </Link>
            <div className="flex flex-col items-center gap-1">
              <Select defaultValue={category.type} onValueChange={(value) => handleType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_TYPES.map((itemType: any, itemTypeIndex: number) => (
                    <SelectItem key={itemTypeIndex} value={itemType.key}>
                      {itemType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-center gap-1">
              {category.status === "published" && (
                <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("hidden")}>
                  <Eye />
                </Button>
              )}
              {category.status === "hidden" && (
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
CategoryItem.displayName = "CategoryItem";
