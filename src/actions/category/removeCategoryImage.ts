"use server";

import {revalidatePath} from "next/cache";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, categoryId: string) {
  const response = await categoryService.removeImage(tenantId, categoryId);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
