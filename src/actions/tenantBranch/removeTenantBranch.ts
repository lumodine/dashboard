"use server";

import {redirect} from "next/navigation";
import tenantBranchService from "@/services/tenantBranch.service";

export default async function (tenantId: string, tenantBranchId: string) {
  const response = await tenantBranchService.remove(tenantId, tenantBranchId);

  if (response.success) {
    redirect(`/d/${tenantId}/branches`);
  }

  return response;
}
