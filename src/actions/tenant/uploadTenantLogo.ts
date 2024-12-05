"use server";

import {revalidatePath} from "next/cache";
import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const response = await tenantService.uploadLogo(tenantId, formData);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
