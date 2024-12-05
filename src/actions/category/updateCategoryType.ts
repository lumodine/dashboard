"use server";
import {revalidatePath} from "next/cache";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, categoryId: string, type: string) {
  const response = await categoryService.updateType(tenantId, categoryId, type);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
