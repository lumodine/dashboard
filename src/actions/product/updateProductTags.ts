"use server";
import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (tenantId: string, productId: string, tags: string[]) {
  const response = await productService.updateTags(tenantId, productId, tags);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
