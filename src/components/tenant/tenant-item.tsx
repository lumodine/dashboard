"use client";

import Link from "next/link";
import Image from "next/image";
import {Banknote, Globe} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export type TenantItemProps = {
  tenant: any;
};

export const TenantItem = ({tenant}: TenantItemProps) => {
  return (
    <Link className="border rounded-lg overflow-hidden hover:bg-gray-50" href={`/d/${tenant._id}`}>
      <div className="flex gap-2">
        <div className="rounded-lg overflow-hidden">
          {tenant.logo ? (
            <Image
              alt={tenant.name}
              className="w-[100px]"
              height={100}
              loading="lazy"
              src={tenant.logo}
              width={100}
            />
          ) : (
            <div className="w-[100px]" />
          )}
        </div>
        <div className="w-full p-2 flex flex-col gap-2">
          <b>{tenant.name}</b>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-1 item-center">
                    <Globe size={16} />
                    <span className="text-xs">{tenant.languages.length}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Diller</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-1 item-center">
                    <Banknote size={16} />
                    <span className="text-xs">{tenant.currencies.length}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Para birimleri</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Link>
  );
};
TenantItem.displayName = "TenantItem";
