"use server";

import {revalidatePath} from "next/cache";
import tenantService from "@/services/tenant.service";

export default async function (tenantId: string) {
  const response = await tenantService.removeBackground(tenantId);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
