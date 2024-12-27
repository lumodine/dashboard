"use client";

import {ChevronsUpDown, Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import {Draggable} from "@hello-pangea/dnd";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateItemStatus from "@/actions/item/updateItemStatus";

export type SubCategoryItemProps = {
  tenant: any;
  subCategory: any;
  index: number;
  isDragDisabled?: boolean;
};

export const SubCategoryItem = ({
  tenant,
  subCategory,
  index,
  isDragDisabled,
}: SubCategoryItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const handleStatus = async (status: string) => {
    const response = await updateItemStatus(tenant._id, subCategory._id, status);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <Draggable
      key={subCategory._id}
      draggableId={subCategory._id}
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
            <Link
              className="flex-1 w-full flex flex-col gap-1 items-start"
              href={`/d/${tenant._id}/menu/${subCategory._id}`}
            >
              <b>{subCategory.translations[0].title}</b>
            </Link>
            <div className="flex flex-col items-center gap-1">
              {subCategory.status === "published" && (
                <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("hidden")}>
                  <Eye />
                </Button>
              )}
              {subCategory.status === "hidden" && (
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
SubCategoryItem.displayName = "SubCategoryItem";
