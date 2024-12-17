"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const color = formData.get("color") as string;

  const response = await tenantService.updateColor(tenantId, color);

  return response;
}
