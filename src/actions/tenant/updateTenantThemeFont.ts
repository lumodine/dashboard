"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const font = formData.get("font") as string;

  const response = await tenantService.updateFont(tenantId, font);

  return response;
}
