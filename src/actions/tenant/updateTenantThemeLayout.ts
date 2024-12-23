"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const headerPosition = formData.get("headerPosition") as string;

  const response = await tenantService.updateLayout(tenantId, headerPosition);

  return response;
}
