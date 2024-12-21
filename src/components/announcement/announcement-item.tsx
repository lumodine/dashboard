"use client";

import Link from "next/link";

export type AnnouncementItemProps = {
  tenant: any;
  announcement: any;
};

export const AnnouncementItem = ({tenant, announcement}: AnnouncementItemProps) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:bg-gray-50">
      <div className="flex gap-4 p-4 items-center justify-start w-full">
        <Link className="flex-1 w-full" href={`/d/${tenant._id}/announcements/${announcement._id}`}>
          <b>{announcement.translations[0].title}</b>
        </Link>
      </div>
    </div>
  );
};
AnnouncementItem.displayName = "AnnouncementItem";
