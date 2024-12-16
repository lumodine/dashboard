"use client";

import Link from "next/link";
import Image from "next/image";
import {Banknote, Globe} from "lucide-react";

export type TenantItemProps = {
  tenant: any;
};

export const TenantItem = ({tenant}: TenantItemProps) => {
  return (
    <Link className="border rounded-lg overflow-hidden hover:bg-gray-50" href={`/d/${tenant._id}`}>
      <div className="flex gap-2">
        <div className="relative flex items-center justify-center w-[100px] h-[100px] cursor-pointer group">
          {tenant.logo && (
            <Image alt={tenant.name} height={100} loading="lazy" src={tenant.logo} width={100} />
          )}
        </div>
        <div className="w-full p-2 flex flex-col gap-2">
          <b>{tenant.name}</b>
          <div className="flex gap-2">
            <div className="flex gap-1 item-center">
              <Globe size={16} />
              <span className="text-xs">{tenant.languages.length}</span>
            </div>
            <div className="flex gap-1 item-center">
              <Banknote size={16} />
              <span className="text-xs">{tenant.currencies.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
TenantItem.displayName = "TenantItem";
