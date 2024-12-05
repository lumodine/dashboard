"use client";

import Link from "next/link";
import {cn} from "@/utils/shadcn";

export type TenantMenuItemProps = {
  menu: any;
  number: string;
};

export const TenantMenuItem = ({menu, number}: TenantMenuItemProps) => {
  return (
    <Link
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-center w-[150px] h-[120px] p-4 rounded-lg bg-gray-100 hover:bg-gray-200 border border-black",
        menu.isDisabled && "opacity-30 cursor-not-allowed",
      )}
      href={menu.isDisabled ? "javascript:void(0);" : menu.href}
      title={menu.title}
    >
      {menu.icon && <menu.icon size={48} strokeWidth={1} />}
      <span className="text-sm font-semibold">
        {number} {menu.title}
      </span>
    </Link>
  );
};
TenantMenuItem.displayName = "TenantMenuItem";
