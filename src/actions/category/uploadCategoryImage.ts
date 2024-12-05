"use server";

import {revalidatePath} from "next/cache";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, categoryId: string, formData: FormData) {
  const response = await categoryService.uploadImage(tenantId, categoryId, formData);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
