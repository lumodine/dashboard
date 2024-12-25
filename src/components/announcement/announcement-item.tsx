"use client";

import {Draggable} from "@hello-pangea/dnd";
import {ChevronsUpDown, Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import updateAnnouncementStatus from "@/actions/announcement/updateAnnouncementStatus";

export type AnnouncementItemProps = {
  tenant: any;
  announcement: any;
  index: number;
};

export const AnnouncementItem = ({tenant, announcement, index}: AnnouncementItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const handleStatus = async (status: string) => {
    const response = await updateAnnouncementStatus(tenant._id, announcement._id, status);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <Draggable key={announcement._id} draggableId={announcement._id} index={index}>
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
            <Link
              className="flex-1 w-full"
              href={`/d/${tenant._id}/announcements/${announcement._id}`}
            >
              <b>{announcement.translations[0].title}</b>
            </Link>
            <div className="flex flex-col items-center gap-1">
              {announcement.status === "published" && (
                <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("hidden")}>
                  <Eye />
                </Button>
              )}
              {announcement.status === "hidden" && (
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
AnnouncementItem.displayName = "AnnouncementItem";
