"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const theme = formData.get("theme") as string;

  const response = await tenantService.updateTheme(tenantId, theme);

  return response;
}
