"use server";

import {redirect} from "next/navigation";
import subCategoryService from "@/services/subCategory.service";

export default async function (tenantId: string, subCategoryId: string) {
  const response = await subCategoryService.remove(tenantId, subCategoryId);

  if (response.success) {
    redirect(`/d/${tenantId}/menu`);
  }

  return response;
}
