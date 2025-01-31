"use client";

import {TenantMenuItem} from "@/components/tenant/tenant-menu-item";
import {MENUS} from "@/constants/menu";

export type TenantMenuListProps = {
  tenant: any;
};

export const TenantMenuList = ({tenant}: TenantMenuListProps) => {
  const menus = MENUS(tenant._id);

  if (menus.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {menus.map((menu: any, menuIndex: number) => (
        <div key={menuIndex} className="mb-4">
          {menu.title && <h3 className="text-xl font-bold">{menu.title}</h3>}
          {menu.items.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {menu.items.map((menuItem: any, menuItemIndex: number) => (
                <li key={menuItemIndex}>
                  <TenantMenuItem menu={menuItem} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
TenantMenuList.displayName = "TenantMenuList";
