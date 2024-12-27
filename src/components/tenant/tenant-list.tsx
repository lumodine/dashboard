"use client";

import {TenantItem} from "@/components/tenant/tenant-item";
import {NotFound} from "@/components/common/error";

export type TenantListProps = {
  tenants: any[];
};

export const TenantList = ({tenants}: TenantListProps) => {
  const count = tenants?.length || 0;
  const hasTenants = count > 0;

  return (
    <>
      {!hasTenants && <NotFound title={"No tenants found. Add one now!"} />}
      {hasTenants && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tenants.map((tenant: any, tenantIndex: number) => (
            <TenantItem key={tenantIndex} tenant={tenant} />
          ))}
        </div>
      )}
    </>
  );
};
TenantList.displayName = "TenantList";
