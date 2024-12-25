"use server";

import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (tenantId: string, productId: string) {
  const response = await productService.removeImage(tenantId, productId);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
