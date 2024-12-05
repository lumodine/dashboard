"use server";

import {redirect} from "next/navigation";
import tenantService from "@/services/tenant.service";

export default async function (tenantId: string) {
  const response = await tenantService.remove(tenantId);

  if (response.success) {
    redirect("/d");
  }

  return response;
}
