"use client";

import {NotFound} from "../common/error";
import {TenantBranchItem} from "./tenant-branch-item";

export type TenantBranchListProps = {
  tenant: any;
  tenantBranches: any[];
};

export const TenantBranchList = ({tenant, tenantBranches}: TenantBranchListProps) => {
  const count = tenantBranches?.length || 0;
  const hasTenantBranches = count > 0;

  return (
    <div className="w-full">
      {!hasTenantBranches && <NotFound title={"No branch found. Add one now!"} />}

      {hasTenantBranches && (
        <div className="grid grid-cols-1 gap-3">
          {tenantBranches.map((tenantBranch: any, tenantBranchIndex: number) => (
            <TenantBranchItem key={tenantBranchIndex} tenant={tenant} tenantBranch={tenantBranch} />
          ))}
        </div>
      )}
    </div>
  );
};
TenantBranchList.displayName = "TenantBranchList";
