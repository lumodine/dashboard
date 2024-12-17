"use client";

import Link from "next/link";
import {Plus} from "lucide-react";
import {TagItem} from "./tag-item";
import {Button} from "@/components/ui/button";
import {NotFound} from "@/components/common/error";

export type TagListProps = {
  tenant: any;
  tags: any[];
};

export const TagList = ({tenant, tags}: TagListProps) => {
  const count = tags?.length || 0;
  const hasTags = count > 0;

  return (
    <div className="w-full">
      <div className="inline-flex gap-2 justify-start items-center mb-3">
        <Link href={`/d/${tenant._id}/tags/create`}>
          <Button size={"sm"}>
            <Plus size={14} /> New tag
          </Button>
        </Link>
      </div>
      {!hasTags && <NotFound title={"No tag found. Add one now!"} />}
      {hasTags && (
        <div className="grid grid-cols-1 gap-3">
          {tags.map((tag: any, tagIndex: number) => (
            <TagItem key={tagIndex} tag={tag} tenant={tenant} />
          ))}
        </div>
      )}
    </div>
  );
};
TagList.displayName = "TagList";
