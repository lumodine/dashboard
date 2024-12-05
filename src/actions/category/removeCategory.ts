"use server";

import {redirect} from "next/navigation";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, categoryId: string) {
  const response = await categoryService.remove(tenantId, categoryId);

  if (response.success) {
    redirect(`/d/${tenantId}/menu`);
  }

  return response;
}
