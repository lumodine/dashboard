"use client";

import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import {useState} from "react";
import {toast} from "react-toastify";
import {AnnouncementItem} from "@/components/announcement/announcement-item";
import {NotFound} from "@/components/common/error";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {reOrder} from "@/utils/array";
import updateAnnouncementSort from "@/actions/announcement/updateAnnouncementSort";

export type AnnouncementListProps = {
  tenant: any;
  announcements: any[];
};

export const AnnouncementList = ({tenant, announcements}: AnnouncementListProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const [dragAnnouncements, setDragAnnouncements] = useState(announcements);

  const count = announcements?.length || 0;
  const hasAnnouncements = count > 0;

  const onDragEnd = async (result: any) => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }

    const items = reOrder(dragAnnouncements, source.index, destination.index);

    setDragAnnouncements(items);

    const orderedItems = items.map((item: any, index: number) => {
      return {
        announcementId: item._id,
        sort: index,
      };
    });

    const response = await updateAnnouncementSort(tenant._id, orderedItems);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <div className="w-full">
      {!hasAnnouncements && <NotFound title={"No announcement found. Add one now!"} />}

      {hasAnnouncements && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 gap-3"
              >
                {announcements.map((announcement: any, announcementIndex: number) => (
                  <AnnouncementItem
                    key={announcementIndex}
                    announcement={announcement}
                    index={announcementIndex}
                    tenant={tenant}
                  />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
AnnouncementList.displayName = "AnnouncementList";
