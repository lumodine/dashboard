"use client";

import Link from "next/link";

export type TenantMenuItemProps = {
    menuIndex: number;
    menu: any;
};

export const TenantMenuItem = ({ menuIndex, menu }: TenantMenuItemProps) => {
    return (
        <Link
            href={menu.href}
            title={menu.title}
            className="flex flex-col items-center justify-center gap-2 text-center w-[150px] h-[120px] p-4 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
            {
                menu.icon && (
                    <menu.icon size={48} strokeWidth={1} />
                )
            }
            <span className="text-sm font-semibold">
                {menuIndex + 1}.{menuIndex + 1}. {menu.title}
            </span>
        </Link>
    );
};
TenantMenuItem.displayName = "TenantMenuItem";
