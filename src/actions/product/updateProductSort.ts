"use server";
import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (tenantId: string, categoryId: string, items: any[]) {
  const response = await productService.updateSort(tenantId, categoryId, items);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
