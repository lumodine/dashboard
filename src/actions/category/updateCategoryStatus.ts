"use server";
import {revalidatePath} from "next/cache";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, categoryId: string, status: string) {
  const response = await categoryService.updateStatus(tenantId, categoryId, status);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
