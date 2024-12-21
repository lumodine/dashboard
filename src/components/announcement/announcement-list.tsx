"use client";

import {NotFound} from "../common/error";
import {AnnouncementItem} from "./announcement-item";

export type AnnouncementListProps = {
  tenant: any;
  announcements: any[];
};

export const AnnouncementList = ({tenant, announcements}: AnnouncementListProps) => {
  const count = announcements?.length || 0;
  const hasAnnouncements = count > 0;

  return (
    <div className="w-full">
      {!hasAnnouncements && <NotFound title={"No announcement found. Add one now!"} />}

      {hasAnnouncements && (
        <div className="grid grid-cols-1 gap-3">
          {announcements.map((announcement: any, announcementIndex: number) => (
            <AnnouncementItem key={announcementIndex} announcement={announcement} tenant={tenant} />
          ))}
        </div>
      )}
    </div>
  );
};
AnnouncementList.displayName = "AnnouncementList";
