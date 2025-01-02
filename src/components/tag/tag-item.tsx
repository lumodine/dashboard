"use client";

import {Draggable} from "@hello-pangea/dnd";
import {ChevronsUpDown, Eye, EyeOff, Tag} from "lucide-react";
import Link from "next/link";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateItemType from "@/actions/item/updateItemType";
import updateItemStatus from "@/actions/item/updateItemStatus";
import {ITEM_TYPES} from "@/constants/item";

export type TagItemProps = {
  tenant: any;
  tag: any;
  index: number;
  isDragDisabled?: boolean;
};

export const TagItem = ({tenant, tag, index, isDragDisabled}: TagItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const handleStatus = async (status: string) => {
    const response = await updateItemStatus(tenant._id, tag._id, status);

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
    const response = await updateItemType(tenant._id, tag._id, type);

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
    <Draggable key={tag._id} draggableId={tag._id} index={index} isDragDisabled={isDragDisabled}>
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

            <div className={`rounded-full bg-primary w-4 h-4 theme-${tag.theme?.color}`} />

            <Link className="flex-1 w-full" href={`/d/${tenant._id}/tags/${tag._id}`}>
              <Tag className="inline-block" size={16} /> <b>{tag.translations[0].title}</b>
            </Link>

            <div className="flex flex-col items-center gap-1">
              <Select defaultValue={tag.type} onValueChange={(value) => handleType(value)}>
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
              {tag.status === "published" && (
                <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("hidden")}>
                  <Eye />
                </Button>
              )}
              {tag.status === "hidden" && (
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
TagItem.displayName = "TagItem";
