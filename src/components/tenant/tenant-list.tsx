"use client";

import Link from "next/link";
import {Plus} from "lucide-react";
import {TenantItem} from "./tenant-item";
import {NotFound} from "@/components/common/error";
import {Button} from "@/components/ui/button";

export type TenantListProps = {
  tenants: any[];
};

export const TenantList = ({tenants}: TenantListProps) => {
  const count = tenants?.length || 0;
  const hasTenants = count > 0;

  return (
    <section>
      <div className="inline-flex gap-2 justify-start items-center mb-3">
        <Link href={"/d/create"}>
          <Button size={"sm"}>
            <Plus size={14} /> Add new tenant
          </Button>
        </Link>
      </div>
      {!hasTenants && <NotFound title={"No tenants found. Add one now!"} />}
      {hasTenants && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tenants.map((tenant: any, tenantIndex: number) => (
            <TenantItem key={tenantIndex} tenant={tenant} />
          ))}
        </div>
      )}
    </section>
  );
};
TenantList.displayName = "TenantList";
