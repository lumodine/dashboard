"use client";

import { cn } from "@/utils/shadcn";
import Link from "next/link";

export type TenantMenuItemProps = {
    parentMenuIndex: number;
    menuIndex: number;
    menu: any;
};

export const TenantMenuItem = ({ parentMenuIndex, menuIndex, menu }: TenantMenuItemProps) => {
    return (
        <Link
            href={menu.href}
            title={menu.title}
            className={
                cn(
                    "flex flex-col items-center justify-center gap-2 text-center w-[150px] h-[120px] p-4 rounded-lg",
                    !menu.isSuggested && "bg-gray-100 hover:bg-gray-200",
                    menu.isSuggested && "bg-primary text-primary-foreground hover:bg-primary/75",
                )
            }
        >
            {
                menu.icon && (
                    <menu.icon size={48} strokeWidth={1} />
                )
            }
            <span className="text-sm font-semibold">
                {parentMenuIndex + 1}.{menuIndex + 1}. {menu.title}
            </span>
        </Link>
    );
};
TenantMenuItem.displayName = "TenantMenuItem";
