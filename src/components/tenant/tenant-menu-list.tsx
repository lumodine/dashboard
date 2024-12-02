"use client";

import Link from "next/link";
import { MENUS } from "@/constants/menu";
import { TenantMenuItem } from "./tenant-menu-item";

export type TenantMenuListProps = {
    tenant: any;
};

export const TenantMenuList = ({ tenant }: TenantMenuListProps) => {
    const menus = MENUS(tenant._id);

    if (menus.length === 0) {
        return null;
    }

    return (
        <>
            {menus.map((menu: any, menuIndex: number) => (
                <div key={menuIndex} className="mb-4">
                    {
                        menu.title && (
                            <h3 className="text-xl font-bold">
                                {menuIndex + 1}. {menu.title}
                            </h3>
                        )
                    }
                    {menu.items.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2">
                            {menu.items.map((menuItem: any, menuItemIndex: number) => (
                                <li key={menuItemIndex}>
                                    <TenantMenuItem
                                        menu={menuItem}
                                        number={`${menuIndex + 1}.${menuItemIndex + 1}.`}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </>
    );
};
TenantMenuList.displayName = "TenantMenuList";
