"use client";

import {ChevronsUpDown, Eye, EyeOff, Trash} from "lucide-react";
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
import {CATEGORY_TYPES} from "@/constants/category";
import updateCategoryStatus from "@/actions/category/updateCategoryStatus";
import uploadCategoryImage from "@/actions/category/uploadCategoryImage";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/shadcn";
import updateCategoryType from "@/actions/category/updateCategoryType";
import removeCategoryImage from "@/actions/category/removeCategoryImage";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";

export type CategoryItemProps = {
  tenant: any;
  category: any;
  index: number;
};

export const CategoryItem = ({tenant, category, index}: CategoryItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const handleStatus = async (status: string) => {
    const response = await updateCategoryStatus(tenant._id, category._id, status);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const handleType = async (type: string) => {
    const response = await updateCategoryType(tenant._id, category._id, type);

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
    <Draggable key={category._id} draggableId={category._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border rounded-lg overflow-hidden hover:bg-gray-50"
        >
          <div className="flex gap-4 p-4 items-center justify-start w-full">
            <div {...provided.dragHandleProps}>
              <ChevronsUpDown strokeWidth={1} />
            </div>
            <div>
              <Label className="text-center" htmlFor={`image-${tenant._id}-${category._id}`}>
                <div className="relative flex items-center justify-center border rounded-lg w-[100px] h-[100px] cursor-pointer group">
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
                    Resim yükle
                  </span>
                  {category.image && (
                    <Button
                      className="absolute -top-1 -right-1 z-20"
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
                className="hidden"
                id={`image-${tenant._id}-${category._id}`}
                name={`image-${tenant._id}-${category._id}`}
                type="file"
                onChange={handleUploadImage}
              />
            </div>
            <Link
              href={`/d/${tenant._id}/menu/${category._id}`}
              className="flex-1 w-full flex flex-col gap-1 items-start"
            >
              <b>{category.translations[0].name}</b>
            </Link>
            <div className="flex flex-col items-center gap-1">
              <Select defaultValue={category.type} onValueChange={(value) => handleType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_TYPES.map((categoryType: any, categoryTypeIndex: number) => (
                    <SelectItem key={categoryTypeIndex} value={categoryType.key}>
                      {categoryType.name}
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
