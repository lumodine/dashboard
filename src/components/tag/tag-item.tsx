"use client";

import Link from "next/link";

export type TagItemProps = {
  tenant: any;
  tag: any;
};

export const TagItem = ({tenant, tag}: TagItemProps) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:bg-gray-50">
      <div className="flex gap-4 p-4 items-center justify-start w-full">
        <div className={`rounded-full bg-primary w-6 h-6 theme-${tag.theme?.color}`} />
        <Link
          className="flex-1 w-full flex flex-col gap-1 items-start"
          href={`/d/${tenant._id}/tags/${tag._id}`}
        >
          <b>{tag.translations[0].name}</b>
        </Link>
      </div>
    </div>
  );
};
TagItem.displayName = "TagItem";
