"use server";
import {revalidatePath} from "next/cache";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, items: any[]) {
  const response = await categoryService.updateSort(tenantId, items);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
