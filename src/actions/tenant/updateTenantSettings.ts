"use server";

import {revalidatePath} from "next/cache";
import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const alias = formData.get("alias") as string;
  const status = formData.get("status") as string;

  const response = await tenantService.updateSettings(tenantId, name, alias, status);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
