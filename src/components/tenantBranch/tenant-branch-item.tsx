"use client";

import Link from "next/link";

export type TenantBranchItemProps = {
  tenant: any;
  tenantBranch: any;
};

export const TenantBranchItem = ({tenant, tenantBranch}: TenantBranchItemProps) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:bg-gray-50">
      <div className="flex gap-4 p-4 items-center justify-start w-full">
        <Link className="flex-1 w-full" href={`/d/${tenant._id}/branches/${tenantBranch._id}`}>
          <b>{tenantBranch.translations[0].title}</b>
        </Link>
      </div>
    </div>
  );
};
TenantBranchItem.displayName = "TenantBranchItem";
